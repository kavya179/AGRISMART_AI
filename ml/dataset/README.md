# AgriSmart AI - Datasets Directory

This folder is designated for storing raw, augmented, and processed datasets for agricultural AI tasks.

## Datasets Planned for Phase 2

1. **Crop Disease Detection (Mandatory Core Module)**:
   - **Source**: PlantVillage / New Plant Diseases Dataset (or field-collected annotated crop photos).
   - **Structure**:
     ```
     ml/dataset/crop_diseases/
     ├── train/
     │   ├── Tomato___Early_blight/
     │   ├── Tomato___Late_blight/
     │   ├── Tomato___healthy/
     │   ├── Potato___Early_blight/
     │   ├── Potato___healthy/
     │   └── ...
     ├── valid/
     └── test/
     ```

2. **Crop Recommendation**:
   - Tabular dataset containing Soil N, P, K, Temperature, Humidity, pH, and Rainfall matched to optimal crop labels.

3. **Irrigation & Soil Moisture**:
   - Time-series or tabular agro-sensor readings.

> **Note**: Heavy image and binary dataset folders should remain in `.gitignore` to prevent bloated git repositories.
