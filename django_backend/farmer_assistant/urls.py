"""
AgriSmart AI - Farmer Assistant & Agentic Advisor URLs
"""
from django.urls import path
from .views import AssistantChatView, AgenticLoopView, AssistantStatusView

urlpatterns = [
    path('chat/', AssistantChatView.as_view(), name='assistant-chat'),
    path('agentic-loop/run/', AgenticLoopView.as_view(), name='agentic-loop-run'),
    path('agentic-loop/status/', AssistantStatusView.as_view(), name='agentic-loop-status'),
    path('status/', AssistantStatusView.as_view(), name='assistant-status'),
]
