"""
AgriSmart AI - Crop Recommendation Serializers
"""
from rest_framework import serializers

class CropRecommendationInputSerializer(serializers.Serializer):
    """
    Validates the 9 agro-climatic inputs for crop suitability prediction.
    """
    soil_type = serializers.CharField(
        required=False, default="Black Soil", max_length=100,
        help_text="Type of soil (e.g., Black Soil, Alluvial Soil, Red Soil, Sandy Loam, Clayey Loam)"
    )
    ph = serializers.FloatField(
        required=False, default=6.5, min_value=3.0, max_value=11.0,
        help_text="Soil pH level (typically 5.5 to 8.5)"
    )
    temperature = serializers.FloatField(
        required=False, default=26.0, min_value=-5.0, max_value=55.0,
        help_text="Average regional temperature in Celsius"
    )
    humidity = serializers.FloatField(
        required=False, default=65.0, min_value=5.0, max_value=100.0,
        help_text="Relative humidity percentage"
    )
    rainfall = serializers.FloatField(
        required=False, default=120.0, min_value=0.0, max_value=3000.0,
        help_text="Expected seasonal rainfall in mm"
    )
    water_availability = serializers.ChoiceField(
        choices=["High", "Moderate", "Low"], required=False, default="Moderate",
        help_text="Irrigation access level (Borewell / Canal / Rainfed)"
    )
    season = serializers.ChoiceField(
        choices=["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)", "Annual (12 Months)"],
        required=False, default="Kharif (Monsoon)",
        help_text="Target planting season"
    )
    location = serializers.CharField(
        required=False, default="Maharashtra", max_length=100,
        help_text="State / District location of the farm"
    )
    previous_crop = serializers.CharField(
        required=False, default="Wheat", max_length=100,
        help_text="Crop harvested in the previous season"
    )
