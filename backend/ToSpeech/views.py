# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TextToSpeechSerializer
from django.http import HttpResponse
from converter.convert import Convert

class TextToSpeechView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        voice = request.query_params.get('voice')
        serializer = TextToSpeechSerializer(data=data)

        if serializer.is_valid():
            convert_instance = Convert()
            output = convert_instance.convert(data["text"], voice)

            # Convert AudioSegment to bytes
            mp3_bytes = output.export(format='mp3').read()

            response = HttpResponse(mp3_bytes, content_type='audio/mpeg')
            response['Content-Disposition'] = 'attachment; filename="output.mp3"'
            return response
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




