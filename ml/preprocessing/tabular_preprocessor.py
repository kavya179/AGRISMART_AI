"""
Tabular data preprocessing utilities for Soil & Crop Recommendation ML models.
"""

def preprocess_soil_features(nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall):
    """
    Format and structure raw soil & climate features into an array ready for scaling and model inference.
    """
    return [
        float(nitrogen),
        float(phosphorus),
        float(potassium),
        float(temperature),
        float(humidity),
        float(ph),
        float(rainfall),
    ]
