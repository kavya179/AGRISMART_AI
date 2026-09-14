from django.urls import path
from .views import DiseasePredictAPIView, DiseaseStatusAPIView

urlpatterns = [
    path('predict/', DiseasePredictAPIView.as_view(), name='disease-predict'),
    path('status/', DiseaseStatusAPIView.as_view(), name='disease-status'),
]
