from .models import TextToSpeech
from rest_framework import serializers

class TextToSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextToSpeech
        fields = ('id', 'text')