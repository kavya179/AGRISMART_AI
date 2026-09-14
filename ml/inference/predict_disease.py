"""
Inference wrapper interface for Crop Disease Detection.
This module is called by the Django disease_detection app to perform inference
on incoming uploaded crop leaf images.
"""
import os

class DiseasePredictor:
    def __init__(self, model_weights_path=None):
        if model_weights_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            model_weights_path = os.path.join(base_dir, 'saved_models', 'crop_disease_model.pth')
        
        self.model_weights_path = model_weights_path
        self.is_loaded = os.path.exists(self.model_weights_path)
        self.model = None
        
        if self.is_loaded:
            self._load_model()

    def _load_model(self):
        """Loads trained model weights into memory."""
        # Will instantiate PyTorch/ONNX architecture and load state_dict in Phase 2
        pass

    def predict(self, image_file):
        """
        Executes inference pipeline on an input image.
        Returns explicit status in Phase 1 (No fake predictions).
        """
        if not self.is_loaded:
            return {
                'status': 'model_not_loaded',
                'message': 'No trained model weights found in ml/saved_models/. Phase 2 training required.',
                'prediction': None,
                'confidence': None
            }
        
        # Real inference computation will run here in Phase 2
        return {
            'status': 'success',
            'prediction': None,
            'confidence': None
        }
