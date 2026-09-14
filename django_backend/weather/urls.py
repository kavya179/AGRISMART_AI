"""
AgriSmart AI - Weather URLs
"""
from django.urls import path
from .views import WeatherIntelligenceView, WeatherStatusView

urlpatterns = [
    path('intelligence/', WeatherIntelligenceView.as_view(), name='weather-intelligence'),
    path('status/', WeatherStatusView.as_view(), name='weather-status'),
]
