"""
AgriSmart AI - Farmer Assistant & Agentic Advisor Serializers
"""
from rest_framework import serializers

class AssistantChatInputSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, min_length=1, max_length=1000)
    language = serializers.CharField(required=False, default='en', max_length=10)
    farmer_context = serializers.DictField(required=False, default=dict)


class AgenticLoopInputSerializer(serializers.Serializer):
    crop_type = serializers.CharField(required=False, default='Tomato', max_length=100)
    growth_stage = serializers.CharField(required=False, default='Flowering', max_length=100)
    soil_moisture = serializers.FloatField(required=False, default=62.0)
    disease_detected = serializers.CharField(required=False, default='Tomato Early Blight', max_length=150)
    disease_status = serializers.CharField(required=False, default='diseased', max_length=50)
    weather_forecast = serializers.CharField(required=False, default='Rain likely within 24 hours', max_length=150)
    rain_probability = serializers.FloatField(required=False, default=75.0)
    humidity = serializers.FloatField(required=False, default=78.0)
    temperature = serializers.FloatField(required=False, default=28.0)
    wind_speed = serializers.FloatField(required=False, default=9.0)
