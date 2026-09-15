"""
AgriSmart AI - High-Level Inference Engine Interface
Loads trained PyTorch model and executes single-image & batch predictions.
Optimized for lightweight CPU inference on low-resource machines (8 GB RAM / CPU).
"""
import os
import sys
import json
from pathlib import Path
from typing import Union, Dict, Any

import torch
import torch.nn.functional as F
from PIL import Image

# Add workspace root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from ml.preprocessing.preprocess import validate_image_file, get_image_transforms
from ml.dataset.dataset_loader import load_class_mapping
from ml.training.train import build_model


class CropDiseasePredictor:
    """
    Lightweight, CPU-compatible Inference interface for Crop Disease Detection models.
    Supports confidence calibration and low-confidence uncertainty handling.
    """
    # Design choice: 0.50 confidence threshold selected based on multiclass calibration
    # to avoid misleading farmers when ambiguous non-leaf background features are submitted.
    DEFAULT_CONFIDENCE_THRESHOLD = 0.50

    def __init__(
        self,
        model_path=None,
        class_mapping_path=None,
        device=None,
        confidence_threshold: float = DEFAULT_CONFIDENCE_THRESHOLD,
    ):
        base_ml_dir = Path(__file__).resolve().parent.parent
        saved_models_dir = base_ml_dir / 'saved_models'

        # Auto-detect model path if not specified
        if model_path is None:
            if (saved_models_dir / 'best_model.pth').exists():
                model_path = saved_models_dir / 'best_model.pth'
            elif (saved_models_dir / 'crop_disease_model.pth').exists():
                model_path = saved_models_dir / 'crop_disease_model.pth'
            else:
                model_path = saved_models_dir / 'best_model.pth'

        # Auto-detect class mapping
        if class_mapping_path is None:
            class_mapping_path = saved_models_dir / 'class_mapping.json'

        self.model_path = Path(model_path)
        self.class_mapping_path = Path(class_mapping_path)
        # Default to CPU for maximum portability unless CUDA is explicitly requested and available
        self.device = device or torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.confidence_threshold = confidence_threshold

        self.is_loaded = False
        self.model = None
        self.idx_to_class = {}
        self.transform = get_image_transforms(image_size=(224, 224), is_training=False)

        self._initialize()

    def _initialize(self):
        """Attempts to load model weights and class mapping."""
        if not self.model_path.exists() or not self.class_mapping_path.exists():
            return

        try:
            # 1. Load class mapping
            self.idx_to_class = load_class_mapping(self.class_mapping_path)
            num_classes = len(self.idx_to_class)

            # 2. Load Checkpoint (map to CPU or target device)
            checkpoint = torch.load(str(self.model_path), map_location=self.device)
            state_dict = checkpoint.get('model_state_dict', checkpoint)
            metadata = checkpoint.get('metadata', {})
            arch = metadata.get('architecture', 'efficientnet_b0')

            # 3. Instantiate model
            self.model = build_model(architecture=arch, num_classes=num_classes, pretrained=False)
            self.model.load_state_dict(state_dict)
            self.model = self.model.to(self.device)
            self.model.eval()
            self.is_loaded = True
            print(f"[Predictor] Loaded model from: {self.model_path} ({num_classes} classes, {arch}, device: {self.device})")
        except Exception as e:
            print(f"[Predictor Warning] Failed to initialize model: {e}")
            self.is_loaded = False

    def predict(self, image_input: Union[str, Path, Image.Image, Any], top_k: int = 3) -> Dict[str, Any]:
        """
        Executes prediction on an image file path, file object, or PIL Image.

        Returns:
            dict: {
                'status': 'success' | 'error' | 'model_not_loaded',
                'predicted_class': str,
                'confidence': float,
                'confidence_percentage': str,
                'is_confident': bool,
                'class_id': int,
                'top_predictions': list[dict],
                'uncertainty_guidance': str or None
            }
        """
        if not self.is_loaded:
            return {
                'status': 'model_not_loaded',
                'message': f'Trained model weights not found at {self.model_path}. Train the model using python ml/train.py first.',
                'predicted_class': None,
                'confidence': None,
                'confidence_percentage': None,
                'is_confident': False,
                'class_id': None,
                'top_predictions': [],
                'uncertainty_guidance': None,
            }

        # Handle various input formats (path vs PIL Image vs file stream)
        try:
            if isinstance(image_input, (str, Path)):
                is_valid, reason = validate_image_file(image_input)
                if not is_valid:
                    return {'status': 'error', 'message': reason}
                pil_image = Image.open(image_input).convert('RGB')
            elif isinstance(image_input, Image.Image):
                pil_image = image_input.convert('RGB')
            else:
                # File-like object (e.g. Django UploadedFile)
                pil_image = Image.open(image_input).convert('RGB')
        except Exception as img_err:
            return {'status': 'error', 'message': f'Image loading error: {str(img_err)}'}

        # Preprocess & run inference
        try:
            tensor = self.transform(pil_image).unsqueeze(0).to(self.device)

            with torch.no_grad():
                logits = self.model(tensor)
                probabilities = F.softmax(logits, dim=1).squeeze(0)

            # Compute top-k
            k = min(top_k, len(self.idx_to_class))
            top_probs, top_indices = torch.topk(probabilities, k=k)

            top_preds = []
            for prob, idx in zip(top_probs.tolist(), top_indices.tolist()):
                top_preds.append({
                    'class_id': idx,
                    'class_name': self.idx_to_class.get(idx, f"Class_{idx}"),
                    'confidence': round(float(prob), 4),
                    'confidence_percentage': f"{prob * 100:.2f}%",
                })

            best = top_preds[0]
            is_confident = best['confidence'] >= self.confidence_threshold

            uncertainty_msg = None
            if not is_confident:
                uncertainty_msg = (
                    f"Low confidence ({best['confidence_percentage']}). "
                    f"The diagnosis is uncertain. Recommend capturing a clear, well-lit, close-up photo of the affected leaf."
                )

            return {
                'status': 'success',
                'predicted_class': best['class_name'],
                'confidence': best['confidence'],
                'confidence_percentage': best['confidence_percentage'],
                'is_confident': is_confident,
                'class_id': best['class_id'],
                'top_predictions': top_preds,
                'uncertainty_guidance': uncertainty_msg,
            }
        except Exception as inf_err:
            return {'status': 'error', 'message': f'Inference execution failed: {str(inf_err)}'}
