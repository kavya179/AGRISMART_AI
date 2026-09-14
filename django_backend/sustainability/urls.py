"""
AgriSmart AI - Sustainability URLs
"""
from django.urls import path
from .views import SustainabilityCalculateView, SustainabilityFormulaView, SustainabilityStatusView

urlpatterns = [
    path('calculate/', SustainabilityCalculateView.as_view(), name='sustainability-calculate'),
    path('formula/', SustainabilityFormulaView.as_view(), name='sustainability-formula'),
    path('status/', SustainabilityStatusView.as_view(), name='sustainability-status'),
]
