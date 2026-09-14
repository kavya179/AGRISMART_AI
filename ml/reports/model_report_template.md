# AgriSmart AI – Model Evaluation Report Template

This document defines the official reporting template for the **Crop Disease Detection Model** evaluation submitted for Smart India Hackathon judging.

---

## 1. Executive Summary
- **Primary Metric (Macro-F1)**: `[Calculated automatically upon evaluation run]`
- **Overall Accuracy**: `[Calculated automatically]`
- **Evaluation Status**: Unseen Field-Condition Testing / Validation Set

---

## 2. Dataset & Partitioning
- **Training Source**: PlantVillage Dataset (Laboratory & Field imagery)
- **Validation Split**: Stratified 80/20 train/validation partition
- **Pre-processing**:
  - Image Resizing: $224 \times 224$ pixels
  - Normalization: ImageNet Channel-wise Mean `[0.485, 0.456, 0.406]` & Std `[0.229, 0.224, 0.225]`
  - Data Augmentation: Horizontal/Vertical flips, mild rotation ($\pm 15^\circ$), and color jittering to emulate diverse sunlight and outdoor camera variations.

---

## 3. Architecture Selection: EfficientNet-B0
- **Why EfficientNet-B0?**:
  1. **Compound Scaling**: Scales network depth, width, and resolution uniformly, achieving superior feature representation with only ~5.3 million parameters (compared to ResNet-50's ~25.6M).
  2. **Low Latency for Farmers**: Can run fast inference even on standard budget CPU instances and edge Android devices without high GPU costs.
  3. **High Generalization**: Demonstrated strong generalization on plant leaf venation and spot pathology patterns.

---

## 4. Hyperparameters & Optimization
- **Optimizer**: AdamW ($\beta_1=0.9, \beta_2=0.999$, Weight Decay $= 10^{-4}$)
- **Learning Rate**: $0.001$ with `ReduceLROnPlateau` scheduler (decay factor $0.5$)
- **Loss Function**: Weighted Cross-Entropy Loss (Inverse frequency weighting to combat class imbalance)
- **Regularization**: Dropout ($p=0.3$) on classification head

---

## 5. Metrics & Failure Analysis
- **Macro-F1**: Evaluated across all classes without majority bias.
- **Confusion Matrix**: Output generated to `ml/reports/confusion_matrix.png`.
- **Known Edge Cases**:
  - Wet or dew-covered leaves reflecting sunlight.
  - Early-stage micro-lesions before macroscopic discoloration develops.
  - Background clutter (e.g., fingers, soil, weeds).
