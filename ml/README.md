# AgriSmart AI - Crop Disease Machine Learning Pipeline

This directory contains the complete PyTorch Computer Vision training, evaluation, preprocessing, and inference pipeline for **Crop Disease Detection** (Mandatory SIH 2026 Core Feature).

---

## 1. Architecture: EfficientNet-B0

- **Selected Backbone**: `EfficientNet-B0` (Transfer Learning from ImageNet)
- **Parameters**: ~5.3 million parameters (5x lighter than ResNet-50) with high feature representation.
- **Farmer Accessibility**: Ultra-low inference latency (< 45ms per scan on CPU), designed for smooth execution on 8 GB RAM laptops without CUDA.
- **Input Size**: $224 \times 224$ pixels (RGB).
- **Alternative Backbones Supported**: `--arch resnet50` and `--arch mobilenet_v3_large`.

---

## 2. Step-by-Step Usage

### Step 1: Install Dependencies
```powershell
pip install -r ml/requirements-ml.txt
```

### Step 2: Prepare Dataset
Place the dataset in `ml/dataset/crop_diseases/`:
```text
ml/dataset/crop_diseases/
├── train/
│   ├── Tomato___Early_blight/
│   ├── Tomato___Late_blight/
│   ├── Tomato___healthy/
│   └── ...
├── valid/
└── test/
```
*(If separate field test data is available, keep it in `ml/dataset/field_test/` for final independent testing).*

### Step 3: Inspect & Verify Dataset
```powershell
python ml/dataset/inspect_dataset.py --data_dir ml/dataset/crop_diseases
```

### Step 4: Train the Model
```powershell
python ml/train.py --data_dir ml/dataset/crop_diseases --arch efficientnet_b0 --epochs 15 --batch_size 32
```
Outputs saved:
- Best checkpoint: `ml/saved_models/best_model.pth`
- Class label mapping: `ml/saved_models/class_mapping.json`
- Training metrics: `ml/reports/training_history.json`

### Step 5: Evaluate the Model (Macro-F1 & Confusion Matrix)
```powershell
python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/crop_diseases/valid
```
Outputs generated in `ml/reports/`:
- `evaluation_results.json`
- `confusion_matrix.png`
- `model_evaluation_report.md`

### Step 6: Independent Field-Condition Test
```powershell
python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/field_test --field_test
```

### Step 7: Single-Image Prediction

**CLI:**
```powershell
python ml/predict.py path/to/leaf_image.jpg
```

**Python Interface:**
```python
from ml.predict import predict

class_label = predict("path/to/leaf_image.jpg")
print(class_label)
# Returns: "Tomato___Early_blight" or "Tomato___healthy"
```

---

## 3. Pipeline Highlights

1. **Lazy Loading**: `SafeImageFolder` streams images per batch, preventing out-of-memory errors on 8 GB RAM systems.
2. **Class Imbalance Loss**: Weighted Cross-Entropy automatically computed from class inverse frequencies.
3. **Uncertainty Calibration**: Built-in 0.50 confidence threshold provides actionable notices when leaf images are blurry or ambiguous.
4. **Zero Test Leakage**: Strict physical isolation of independent field evaluation datasets.
