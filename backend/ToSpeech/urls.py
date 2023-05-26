from django.urls import path
from .views import TextToSpeechView

urlpatterns = [
    path('convert', TextToSpeechView.as_view(), name="convert-to-speech")
]