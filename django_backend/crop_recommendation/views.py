"""
AgriSmart AI - Crop Recommendation Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CropRecommendationInputSerializer
from .engine import compute_crop_recommendations, MODEL_METADATA

class CropRecommendationPredictView(APIView):
    """
    POST /api/crops/recommend/ or /api/crop/recommend/
    Receives 9 soil-climate parameters and returns ranked crops,
    suitability percentage, short agronomic reason, and farming considerations.
    """
    def post(self, request):
        serializer = CropRecommendationInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "success": False,
                "error": "Invalid input parameters.",
                "details": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        params = serializer.validated_data
        result = compute_crop_recommendations(
            soil_type=params.get("soil_type", "Black Soil"),
            ph=params.get("ph", 6.5),
            temperature=params.get("temperature", 26.0),
            humidity=params.get("humidity", 65.0),
            rainfall=params.get("rainfall", 120.0),
            water_availability=params.get("water_availability", "Moderate"),
            season=params.get("season", "Kharif (Monsoon)"),
            location=params.get("location", "Maharashtra"),
            previous_crop=params.get("previous_crop", "Wheat")
        )

        return Response(result, status=status.HTTP_200_OK)


class CropRecommendationStatusView(APIView):
    """
    GET /api/crop/status/
    Returns model metadata, evaluation metrics (Accuracy, Macro-F1), and dataset source.
    """
    def get(self, request):
        return Response({
            "status": "ready",
            "module": "Crop Recommendation Engine",
            "metadata": MODEL_METADATA,
            "endpoint": "/api/crops/recommend/"
        }, status=status.HTTP_200_OK)
