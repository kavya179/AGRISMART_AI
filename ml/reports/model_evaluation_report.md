# AgriSmart AI - Model Evaluation Report

**Target Domain:** Crop Disease Detection (Mandatory Core Feature)
**Evaluation Type:** Real Benchmark Run

---

## 1. Executive Summary

| Metric | Benchmark Score |
| :--- | :--- |
| **Macro-F1 Score** | **1.0000** |
| **Overall Accuracy** | **100.00%** |
| **Macro-Precision** | **1.0000** |
| **Macro-Recall** | **1.0000** |
| **Evaluated Samples** | **6** |

---

## 2. Dataset & Split Configuration
- **Dataset Source**: PlantVillage
- **Input Resolution**: 224 x 224 pixels (RGB)
- **Normalization**: ImageNet Standard (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`)
- **Data Augmentation**: Random Horizontal/Vertical Flip, Random Rotation (+/- 15 deg), Color Jitter

---

## 3. Model Architecture & Hyperparameters
- **Backbone Architecture**: `efficientnet_b0` (Transfer Learning from ImageNet)
- **Optimization Algorithm**: `AdamW`
- **Initial Learning Rate**: `0.001`
- **Batch Size**: `32`
- **Imbalance Handling**: Inverse Class Frequency Weighted Cross-Entropy Loss

---

## 4. Per-Class Diagnostic Performance

| Class Name | Precision | Recall | F1-Score | Support (Samples) |
| :--- | :--- | :--- | :--- | :--- |
| Tomato___Early_blight | 1.0000 | 1.0000 | 1.0000 | 2 |
| Tomato___healthy | 1.0000 | 1.0000 | 1.0000 | 2 |
| Tomato___Late_blight | 1.0000 | 1.0000 | 1.0000 | 2 |

---

## 5. Limitations & Edge Case Considerations

1. **Illumination Variability**: Field photos taken in intense sunlight or deep shadows may reduce feature clarity compared to laboratory conditions.
2. **Multiple Pathogens**: Leaves with simultaneous bacterial and fungal infections are classified based on the dominant visual symptom.
3. **Background Clutter**: Soil, hands, or weeds in the image background can introduce noise; center-cropping or isolating the leaf improves diagnostic confidence.
