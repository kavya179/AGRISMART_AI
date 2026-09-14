from django.urls import path
from .views import CropRecommendationPredictView, CropRecommendationStatusView

urlpatterns = [
    path('recommend/', CropRecommendationPredictView.as_view(), name='crop-recommend'),
    path('status/', CropRecommendationStatusView.as_view(), name='crop-status'),
]
