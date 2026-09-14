# 🌿 AgriSmart AI – Crop Disease Machine Learning Pipeline

This directory contains the complete PyTorch Computer Vision training, evaluation, preprocessing, and inference pipeline for **Crop Disease Detection**.

---

## 🏗️ 1. Architecture Overview: EfficientNet-B0

- **Selected Backbone**: `EfficientNet-B0` (Transfer Learning from ImageNet)
- **Why EfficientNet-B0?**:
  - **Parameter Efficiency**: ~5.3 million parameters (5x lighter than ResNet-50) with equal or higher classification accuracy on leaf pathology.
  - **Farmer Accessibility**: Ultra-low inference latency (< 50ms per scan on CPU), making it suitable for field deployment on budget cloud VMs or edge devices.
  - **Compound Scaling**: Uniform scaling of resolution, depth, and width provides robust multi-scale feature maps for detecting subtle fungal spots and leaf discolorations.
- *Alternative Backbones Supported*: `--arch resnet50` and `--arch mobilenet_v3_large`.

---

## 🚀 2. How to Use the Pipeline

### Step 1: Prepare the Dataset
Place the dataset folders (e.g. from PlantVillage) in `ml/dataset/crop_diseases/`:
```
ml/dataset/crop_diseases/
├── Tomato___Early_blight/
│   ├── image1.jpg
│   └── image2.jpg
├── Tomato___healthy/
├── Potato___Early_blight/
└── ...
```
*(No hard-coded classes: The pipeline automatically discovers all class subdirectories).*

### Step 2: Validate the Dataset
Scan for and remove corrupt, truncated, or zero-byte images:
```bash
python ml/preprocess.py --data_dir ml/dataset/crop_diseases --clean
```

### Step 3: Train the Model
Run transfer learning training with early stopping and automatic class weighting:
```bash
python ml/train.py --data_dir ml/dataset/crop_diseases --arch efficientnet_b0 --epochs 15 --batch_size 32
```
Outputs saved:
- Best model weights: `ml/saved_models/best_model.pth`
- Class label mapping: `ml/saved_models/class_mapping.json`
- Training history: `ml/reports/training_history.json`

### Step 4: Evaluate the Model
Run evaluation on a validation/test folder to compute **Macro-F1**, Accuracy, and Confusion Matrix:
```bash
python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/crop_diseases/val
```
Outputs saved to `ml/reports/`:
- `evaluation_results.json` (Structured JSON metrics)
- `confusion_matrix.png` (Visual matrix plot)
- `model_evaluation_report.md` (Human-readable benchmark report)

### Step 5: Test Single-Image Prediction
Run command-line prediction on any leaf image:
```bash
python ml/predict.py --image path/to/leaf_photo.jpg
```
Or in Python code:
```python
from ml.predict import predict
result_class = predict("path/to/leaf_photo.jpg")
print(result_class)
```

---

## 📊 3. Key Pipeline Capabilities
1. **Dynamic Class Discovery**: Automatically handles any number of crop classes from directory structure.
2. **Class Imbalance Handling**: Computes inverse class frequency weights applied to `nn.CrossEntropyLoss`.
3. **Data Augmentation**: Robust random rotation, color jitter, and flips for field condition robustness.
4. **Macro-F1 Evaluation**: Rigorous unweighted metric reporting across all disease classes.
