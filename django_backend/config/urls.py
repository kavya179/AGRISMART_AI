"""
URL configuration for AgriSmart AI project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import datetime

from disease_detection.services import disease_model_service


@api_view(['GET'])
def health_check(request):
    """
    GET /api/health/
    Health check endpoint returning service status, model state, and module availability.
    """
    return Response({
        'status': 'healthy',
        'service': 'AgriSmart AI Django REST Service',
        'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'framework': 'Django REST Framework',
        'debug_mode': settings.DEBUG,
        'model_service': {
            'crop_disease_model_loaded': disease_model_service.is_loaded,
            'architecture': disease_model_service.model_name if disease_model_service.is_loaded else None,
            'classes_count': len(disease_model_service.idx_to_class),
        },
        'endpoints': {
            'health': '/api/health/',
            'disease_predict': '/api/disease/predict/',
            'crop_recommendation': '/api/crops/recommend/',
            'irrigation_predict': '/api/irrigation/predict/',
            'weather': '/api/weather/status/',
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Core Health Check Endpoint
    path('api/health/', health_check, name='health-check'),
    
    # AgriSmart AI Module Endpoints
    path('api/disease/', include('disease_detection.urls')),
    
    # Crop Recommendation (Supporting both /api/crops/ and /api/crop/)
    path('api/crops/', include('crop_recommendation.urls')),
    path('api/crop/', include('crop_recommendation.urls')),
    
    # Smart Irrigation
    path('api/irrigation/', include('irrigation.urls')),
    
    # Other micro-modules
    path('api/weather/', include('weather.urls')),
    path('api/sustainability/', include('sustainability.urls')),
    path('api/assistant/', include('farmer_assistant.urls')),
]
