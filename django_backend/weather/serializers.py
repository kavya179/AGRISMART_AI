"""
AgriSmart AI - Weather Intelligence Serializers
"""
from rest_framework import serializers

class WeatherIntelligenceInputSerializer(serializers.Serializer):
    location = serializers.CharField(required=False, default="Gujarat", max_length=150)
    latitude = serializers.FloatField(required=False, allow_null=True)
    longitude = serializers.FloatField(required=False, allow_null=True)
    crop_type = serializers.CharField(required=False, default="Tomato", max_length=100)
    growth_stage = serializers.CharField(required=False, default="Flowering", max_length=100)
