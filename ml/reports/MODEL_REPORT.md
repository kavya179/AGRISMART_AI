# AgriSmart AI - Crop Disease Detection Model Report

**Project:** AgriSmart AI (SIH 2026 Problem Statement)  
**Task:** Computer Vision Crop Disease Diagnostic Pipeline  
**Model Architecture:** EfficientNet-B0 (Compound-Scaled CNN)  
**Input Size:** 224 x 224 (RGB)  
**Primary Metric:** Macro-F1 Score  

---

## 1. Problem Statement & Mandatory SIH Requirement

The core AI requirement of the AgriSmart AI system is:
> **Image of a crop/leaf -> trained ML model -> disease/healthy class -> simple actionable guidance.**

The Python functional interface provided by the ML subsystem is:
```python
predict(image_path) -> class_label
```
Example:
```python
result = predict("leaf_sample.jpg")
# Returns: "Tomato___Early_blight" or "Tomato___healthy"
```

---

## 2. Hardware Constraints & Deployment Strategy

* **Training Environment:** Strong workstation / GPU machine via Live Share.
* **Inference Hardware Target:** Low-resource farmer laptop / edge client (~8 GB RAM, AMD/Intel integrated graphics, CPU execution).
* **Architectural Decisions:**
  * Selected **EfficientNet-B0** (~5.3M parameters) for superior compound feature scaling and minimal memory footprint (< 30 MB on disk).
  * Ultra-fast CPU inference latency (< 45 ms per frame).
  * Lazy dataset streaming via `SafeImageFolder` to prevent loading full datasets into RAM.
  * Windows-safe multiprocessing (`num_workers=0`).

---

## 3. Dataset Organization & Split Protocol

The dataset loader supports the standard agricultural directory layout:

```text
ml/dataset/
    crop_diseases/
        train/
            <Crop>___<Disease_1>/
            <Crop>___<Disease_2>/
            <Crop>___healthy/
        valid/
            <Crop>___<Disease_1>/
            <Crop>___<Disease_2>/
            <Crop>___healthy/
        test/
```

### Independent Field-Condition Test Protection:
* Any separate real-world field-condition dataset resides under `ml/dataset/field_test/`.
* **Zero Leakage Rule:** The field-test set is strictly isolated and never utilized for training, data augmentation, hyperparameter tuning, model selection, early stopping, or class balancing.
* Validation Macro-F1 on the validation set is strictly used for model checkpoint selection.

---

## 4. Image Preprocessing & Augmentation Pipeline

* **Input Dimensions:** Resized to 224 x 224 pixels.
* **Channel Normalization:** ImageNet standard mean `[0.485, 0.456, 0.406]` and standard deviation `[0.229, 0.224, 0.225]`.
* **Training Augmentations:**
  * Random resized crop to 224 x 224
  * Random horizontal flip ($p=0.5$)
  * Random vertical flip ($p=0.2$)
  * Random rotation ($\pm 15^\circ$)
  * Color jittering (brightness=0.15, contrast=0.15, saturation=0.15) to simulate variable outdoor sunlight.
* **Validation / Test / Inference Preprocessing:** Deterministic resize to 224 x 224 and ImageNet normalization.

---

## 5. Model Architecture & Training Strategy

* **Backbone:** Pretrained `EfficientNet-B0` (ImageNet initial weights).
* **Head:** Dropout ($p=0.3$) + Linear classifier with dynamic output classes.
* **Loss Function:** `nn.CrossEntropyLoss` with inverse class frequency weights to handle severe class imbalance:
  $$w_c = \frac{N_{\text{total}}}{C \times N_c}$$
* **Optimizer:** `AdamW` ($\text{lr} = 10^{-3}$, weight decay $= 10^{-4}$).
* **LR Scheduler:** `ReduceLROnPlateau` (mode='max', factor=0.5, patience=2) tracking validation Macro-F1.
* **Early Stopping:** Monitored on validation Macro-F1 with patience = 5.

---

## 6. Uncertainty & Confidence Threshold Design

* **Internal Design Choice:** Confidence threshold calibrated at **0.50 (50%)**.
* **Behavior:**
  * **High Confidence ($\ge 50\%$):** Displays predicted disease diagnosis and full actionable guidance.
  * **Low Confidence ($< 50\%$):** Alerts the farmer with an uncertainty warning: *"The diagnosis is uncertain. Recommend capturing a clear, well-lit close-up photo of the affected leaf."*
* Prevents hallucinated or misleading diagnoses when non-leaf images, blurry photos, or ambiguous backgrounds are submitted.

---

## 7. Model Evaluation & Benchmark Artifacts

When evaluation is run via `python ml/evaluate.py`, the following authentic artifacts are generated in `ml/reports/`:
1. `evaluation_results.json`: Full numeric metrics (Accuracy, Macro-F1, Macro-Precision, Macro-Recall, Weighted-F1, Confusion Matrix).
2. `confusion_matrix.png`: Color-mapped confusion matrix heatmap.
3. `model_evaluation_report.md`: Reviewer-ready Markdown report.

---

## 8. Reproducibility & Step-by-Step Commands

### Step 1: Inspect Dataset
```powershell
python ml/dataset/inspect_dataset.py --data_dir ml/dataset/crop_diseases
```

### Step 2: Train Model
```powershell
python ml/train.py --data_dir ml/dataset/crop_diseases --arch efficientnet_b0 --epochs 15 --batch_size 32
```

### Step 3: Run Validation / Test Evaluation
```powershell
python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/crop_diseases/valid
```

### Step 4: Run Independent Field-Test Evaluation
```powershell
python ml/evaluate.py --model_path ml/saved_models/best_model.pth --data_dir ml/dataset/field_test --field_test
```

### Step 5: Run Single-Image Prediction
```powershell
python ml/predict.py path/to/leaf_sample.jpg
```

---

## 9. Real-World Limitations

1. **Simultaneous Infections:** Leaves exhibiting multiple co-occurring fungal and bacterial infections are diagnosed by dominant visual symptom.
2. **Extreme Lighting:** Severe backlight or nighttime flashlight flash may alter leaf reflectance.
3. **Background Occlusions:** Heavy soil or weed clutter can degrade confidence; close-up leaf framing is recommended.
