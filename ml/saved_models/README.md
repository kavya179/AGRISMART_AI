# Saved Models Directory

This directory holds exported model artifacts (weights, ONNX graphs, pickled pipelines, and label maps).

## Expected Model Files (Phase 2)
- `crop_disease_model.pth` or `crop_disease_model.h5` (PyTorch / TensorFlow vision model)
- `class_indices.json` (Mapping of class index to disease names and recommended remedies)
- `crop_recommendation_pipeline.pkl` (Scikit-Learn Random Forest / XGBoost model)
- `soil_scaler.pkl` (StandardScaler for input soil features)

> **Important**: Model weights will be trained and exported here in Phase 2.
