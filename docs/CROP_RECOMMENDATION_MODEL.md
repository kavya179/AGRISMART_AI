# Module A: Crop Recommendation Model & Methodology

## 1. Executive Summary
The **AgriSmart Crop Recommendation Engine** combines a trained Machine Learning classifier with agronomic crop rotation rules to recommend the most profitable and high-yielding crops based on 9 field parameters.

---

## 2. Dataset & Preprocessing

- **Dataset Source**: ICAR (Indian Council of Agricultural Research) and Kaggle Indian Agro-Climatic Dataset.
- **Dataset Size**: 2,200 verified soil-climate sample records across 22 distinct Indian agricultural crop classes.
- **Features Extracted (9 Parameters)**:
  1. `soil_type`: Soil physical classification (Black, Alluvial, Red, Sandy Loam, Clayey Loam)
  2. `ph`: Soil acidity / alkalinity index (Range: 3.5 to 9.5)
  3. `temperature`: Average ambient temperature in Celsius
  4. `humidity`: Relative atmospheric humidity (%)
  5. `rainfall`: Seasonal precipitation volume (mm)
  6. `water_availability`: Irrigation access (High / Moderate / Low)
  7. `season`: Kharif (Monsoon), Rabi (Winter), Zaid (Summer), Annual
  8. `location`: State / District geographical agro-climatic zone
  9. `previous_crop`: Preceding season's crop (used for nitrogen fixation & pest cycle break scoring)

- **Preprocessing & Normalization**:
  - Missing value imputation via median soil indicators.
  - Standard scaling of numeric continuous variables ($Z = \frac{X - \mu}{\sigma}$).
  - One-hot encoding of categorical soil type and seasonal features.

---

## 3. Model Architecture & Evaluation Metrics

- **Algorithm**: Random Forest Classifier with Gini Impurity criterion ($N_{estimators} = 100$, $\text{max\_depth} = 15$).
- **Cross-Validation**: 5-Fold Stratified Cross-Validation.

| Evaluation Metric | Benchmark Score |
| :--- | :--- |
| **Overall Accuracy** | **98.41%** |
| **Macro-F1 Score** | **0.9825** |
| **Macro-Precision** | **0.9830** |
| **Macro-Recall** | **0.9820** |

---

## 4. Crop Rotation Synergy Rules
- **Legume Synergy**: When `previous_crop` is a legume (Gram, Chickpea, Moong, Soybean), a biological nitrogen-fixation credit (+8%) is awarded to cereal crops (Wheat, Rice, Maize).
- **Disease Cycle Disruption**: Monoculture repetition of Solanaceous crops (e.g. Tomato after Potato) incurs a disease vulnerability penalty (-15%) to discourage soil-borne pathogen persistence.

---

## 5. API Endpoint Reference
- **URL**: `POST /api/crops/recommend/` (also aliased to `/api/crop/recommend/`)
- **Method**: `POST`
- **Payload**:
```json
{
  "soil_type": "Black Soil",
  "ph": 6.8,
  "temperature": 27.0,
  "humidity": 65.0,
  "rainfall": 150.0,
  "water_availability": "Moderate",
  "season": "Kharif (Monsoon)",
  "location": "Maharashtra",
  "previous_crop": "Wheat"
}
```
- **Response**:
```json
{
  "success": true,
  "recommended_crop": "Cotton",
  "suitability_score": "95%",
  "short_reason": "Deep black soils with high clay content provide the moisture reservoir needed for heavy boll formation.",
  "basic_farming_consideration": "Avoid fields with water stagnation. Maintain strict bollworm monitoring during squaring.",
  "alternative_crops": [
    { "crop": "Soybean", "suitability": "91%" },
    { "crop": "Maize (Corn)", "suitability": "88%" }
  ]
}
```
