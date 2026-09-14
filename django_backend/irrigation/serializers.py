"""
AgriSmart AI - Smart Irrigation Serializers
"""
from rest_framework import serializers

class IrrigationPredictInputSerializer(serializers.Serializer):
    """
    Validates input parameters for smart watering advice.
    """
    soil_moisture = serializers.FloatField(
        required=False, default=62.0, min_value=0.0, max_value=100.0,
        help_text="Current soil moisture percentage (0-100%)"
    )
    weather_forecast = serializers.CharField(
        required=False, default="Partly Sunny", max_length=150,
        help_text="Expected weather condition (e.g. Sunny, Rain Expected, Overcast)"
    )
    crop_type = serializers.CharField(
        required=False, default="Tomato", max_length=100,
        help_text="Cultivated crop name"
    )
    growth_stage = serializers.CharField(
        required=False, default="Flowering", max_length=100,
        help_text="Current plant development stage (Seedling, Vegetative, Flowering, Maturity)"
    )
