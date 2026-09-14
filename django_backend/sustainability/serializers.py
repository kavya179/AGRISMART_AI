"""
AgriSmart AI - Sustainability Serializers
"""
from rest_framework import serializers

class SustainabilityCalculateInputSerializer(serializers.Serializer):
    irrigation_method = serializers.ChoiceField(
        choices=['drip', 'sprinkler', 'furrow', 'flood'],
        required=False, default='drip'
    )
    rainwater_harvesting = serializers.BooleanField(required=False, default=True)
    moisture_sensor_timing = serializers.BooleanField(required=False, default=True)
    organic_manure_used = serializers.BooleanField(required=False, default=True)
    soil_tested = serializers.BooleanField(required=False, default=True)
    mulching_or_cover_crop = serializers.BooleanField(required=False, default=False)
    crop_residue_burned = serializers.BooleanField(required=False, default=False)
    legume_crop_rotation = serializers.BooleanField(required=False, default=True)
    bio_pesticides_used = serializers.BooleanField(required=False, default=True)
    regular_disease_monitoring = serializers.BooleanField(required=False, default=True)
