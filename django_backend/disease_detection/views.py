"""
AgriSmart AI - Disease Detection REST API Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import DiseaseImageUploadSerializer
from .services import disease_model_service


class DiseasePredictAPIView(APIView):
    """
    POST /api/disease/predict/
    Accepts a crop leaf image and returns the disease diagnosis, confidence score,
    health status, and maintainable precautionary guidance.
    """
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # 1. Validate Input Payload
        serializer = DiseaseImageUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "error": "Invalid request payload.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        uploaded_image = serializer.validated_data['image']

        # 2. Execute Inference via Singleton Model Service (No reloading/retraining)
        result = disease_model_service.predict(uploaded_image.file)

        if not result["success"]:
            http_status = result.get("status_code", status.HTTP_400_BAD_REQUEST)
            return Response(
                {
                    "success": False,
                    "error": result.get("error", "Failed to process image prediction."),
                },
                status=http_status,
            )

        # 3. Return Clean Structured Response
        return Response(
            {
                "success": True,
                "prediction": result["prediction"],
                "guidance": result["guidance"],
            },
            status=status.HTTP_200_OK,
        )


class DiseaseStatusAPIView(APIView):
    """
    GET /api/disease/status/
    Returns the readiness of the Crop Disease Detection ML service.
    """
    def get(self, request):
        is_ready = disease_model_service.is_loaded
        classes = list(disease_model_service.idx_to_class.values()) if is_ready else []

        return Response(
            {
                "service": "Crop Disease Detection ML Service",
                "model_loaded": is_ready,
                "architecture": disease_model_service.model_name if is_ready else None,
                "classes_count": len(classes),
                "supported_classes": classes,
                "status": "ready" if is_ready else "pending_model_training",
                "endpoint": "/api/disease/predict/",
            },
            status=status.HTTP_200_OK,
        )
