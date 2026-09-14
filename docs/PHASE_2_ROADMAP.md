# AgriSmart AI – Phase 2 Implementation Roadmap

## Overview
Phase 1 established the full-stack foundation (Django AI Backend + Node/MongoDB Gateway + React UI + ML Directory scaffolding). Phase 2 focuses on training real Machine Learning models, generating real predictions, and persisting diagnostic histories.

---

## Key Deliverables for Phase 2

### 1. Mandatory Core Feature: Crop Disease Vision Model
- [ ] Acquire PlantVillage / Kaggle agricultural leaf dataset (38 classes).
- [ ] Implement CNN backbone (Transfer Learning with `ResNet50` / `MobileNetV3` for lightweight edge inference).
- [ ] Train model with data augmentation (`image_transforms.py`) and evaluate F1-score/Accuracy.
- [ ] Export trained weights `crop_disease_model.pth` and label index mapping to `ml/saved_models/`.
- [ ] Connect `disease_detection/views.py` directly to `ml/inference/predict_disease.py` for live inference.

### 2. Optional Modules (Sequential Rollout)
1. **Crop Recommendation Engine**:
   - Train Random Forest classifier on Soil NPK + Climate dataset.
   - Serve predictions via `crop_recommendation/views.py`.
2. **Smart Irrigation Advisor**:
   - Implement soil moisture threshold & evapotranspiration estimation formulas.
3. **Multilingual Farmer Assistant**:
   - Implement localized agricultural FAQ retrieval / RAG pipeline.

### 3. Full Data Persistence Loop
- [ ] Link disease scan results directly from Django to Node.js `/api/farmers/crops` to save diagnostic history in MongoDB.
