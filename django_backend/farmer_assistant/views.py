"""
AgriSmart AI - Farmer Assistant & Agentic Advisor Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import AssistantChatInputSerializer, AgenticLoopInputSerializer
from .assistant_service import FarmerAssistantService
from .agentic_advisor import AgenticAdvisorEngine


class AssistantChatView(APIView):
    """
    POST /api/assistant/chat/
    Grounded multilingual conversational interface using farm state and disease detection catalogs.
    """
    def post(self, request):
        serializer = AssistantChatInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        query = data.get('query')
        lang = data.get('language', 'en')
        context = data.get('farmer_context', {})

        result = FarmerAssistantService.generate_response(query, language=lang, context=context)
        return Response({
            'success': True,
            'response': result
        }, status=status.HTTP_200_OK)


class AgenticLoopView(APIView):
    """
    POST /api/assistant/agentic-loop/run/
    GET  /api/assistant/agentic-loop/run/
    Executes demonstrable 8-step decision loop and outputs full execution traces.
    """
    def get(self, request):
        default_context = {
            'crop_type': 'Tomato',
            'growth_stage': 'Flowering',
            'soil_moisture': 62.0,
            'disease_detected': 'Tomato Early Blight',
            'disease_status': 'diseased',
            'weather_forecast': 'Rain likely within 24 hours',
            'rain_probability': 75.0,
            'humidity': 78.0,
            'temperature': 28.0,
            'wind_speed': 9.0
        }
        result = AgenticAdvisorEngine.execute_decision_loop(default_context)
        return Response(result, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AgenticLoopInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        result = AgenticAdvisorEngine.execute_decision_loop(serializer.validated_data)
        return Response(result, status=status.HTTP_200_OK)


class AssistantStatusView(APIView):
    """
    GET /api/assistant/status/
    """
    def get(self, request):
        return Response({
            'module': 'AgriSmart Multilingual Farmer Assistant & Agentic Advisor',
            'status': 'Online & Active',
            'supported_languages': ['English (en)', 'Hindi (hi)', 'Marathi (mr)', 'Gujarati (gu)'],
            'decision_loop_stages': [
                '1. COLLECT DATA',
                '2. ANALYSE',
                '3. CHECK WEATHER',
                '4. CHECK CROP CONDITION',
                '5. CHECK IRRIGATION',
                '6. DECIDE',
                '7. GENERATE RECOMMENDATION',
                '8. NOTIFY FARMER'
            ]
        }, status=status.HTTP_200_OK)
