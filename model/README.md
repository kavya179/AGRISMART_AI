# AgriSmart AI — Model Checkpoints & Serialization Directory

This directory stores trained computer-vision and agronomic classification model checkpoints.

## Model Files
- `crop_disease_model.pth`: EfficientNet-B0 transfer learning weights fine-tuned on the PlantVillage crop disease benchmark.
- `class_indices.json`: Mapping of class index to crop and disease nomenclature.

## Training Architecture
- **Base Backbone**: EfficientNet-B0 (Pretrained on ImageNet-1K)
- **Classifier Head**:
  - `Dropout(p=0.3)`
  - `Linear(in_features=1280, out_features=512)`
  - `ReLU()`
  - `BatchNorm1d(512)`
  - `Dropout(p=0.2)`
  - `Linear(in_features=512, out_features=NUM_CLASSES)`
- **Input Resolution**: $224 \times 224 \times 3$ RGB
- **Normalization**: ImageNet Mean `[0.485, 0.456, 0.406]` & Std `[0.229, 0.224, 0.225]`

## Reproducing Training & Inference
```bash
# Run training pipeline
python ml/train.py --epochs 15 --batch-size 32 --lr 0.0003

# Run evaluation on test split
python ml/evaluate.py --checkpoint model/crop_disease_model.pth
```
