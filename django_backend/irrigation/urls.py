from django.urls import path
from .views import SmartIrrigationPredictView, SmartIrrigationStatusView

urlpatterns = [
    path('predict/', SmartIrrigationPredictView.as_view(), name='irrigation-predict'),
    path('status/', SmartIrrigationStatusView.as_view(), name='irrigation-status'),
]
