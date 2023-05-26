from django.db import models

# Create your models here.

class TextToSpeech(models.Model):
    text = models.TextField()