"""
AgriSmart AI - Smart Irrigation Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import IrrigationPredictInputSerializer
from .engine import compute_irrigation_decision

class SmartIrrigationPredictView(APIView):
    """
    POST /api/irrigation/predict/
    Accepts soil moisture, weather forecast, crop type, and growth stage,
    and returns deterministic irrigation priority, action, and agronomic reason.
    """
    def post(self, request):
        serializer = IrrigationPredictInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "error": "Invalid input parameters.",
                "details": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        result = compute_irrigation_decision(
            soil_moisture=data.get("soil_moisture", 62.0),
            weather_forecast=data.get("weather_forecast", "Partly Sunny"),
            crop_type=data.get("crop_type", "Tomato"),
            growth_stage=data.get("growth_stage", "Flowering")
        )

        return Response(result, status=status.HTTP_200_OK)


class SmartIrrigationStatusView(APIView):
    """
    GET /api/irrigation/status/
    Returns irrigation engine metadata and FAO-56 crop profiles.
    """
    def get(self, request):
        return Response({
            "status": "ready",
            "module": "Smart Irrigation & FAO-56 Water Advisor",
            "endpoint": "/api/irrigation/predict/",
            "methodology": "FAO-56 Evapotranspiration Crop Coefficient (Kc) & Weather Risk Modulation"
        }, status=status.HTTP_200_OK)
