import os
from google.cloud import texttospeech
import time
import uuid
from pydub import AudioSegment

class Convert:

    # Set the path to your service account key JSON file

    def __init__(self):
        # Get the absolute path to the directory where this script is located
        self.dir_path = os.path.dirname(os.path.realpath(__file__))

        # Use os.path.join to combine the path to this directory with the filename
        json_path = os.path.join(self.dir_path, 'credentials.json')

        # Set the path to your service account key JSON file
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = json_path
        # Instantiates a client
        self.client = texttospeech.TextToSpeechClient()

    def split_file(self, text):
        chunk_size = 4 * 1024  # 4.5 KB
        try:
            if len(text) <= chunk_size:
                return [text]  # Return the text as a single chunk

            chunks = []
            index = 0
            while text:
                text = text[chunk_size:]
                chunks.append(text)
                index += 1
            return chunks
        except OSError:
            print(f"Error: Could not split the text")
            return None

    def convert_to_speech(self, text):
        # Set the text input to be synthesized
        synthesis_input = texttospeech.SynthesisInput(text=text)

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("female")
        voice = texttospeech.VoiceSelectionParams(
            language_code='en-US', name='en-US-Neural2-J', ssml_gender=texttospeech.SsmlVoiceGender.MALE
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = self.client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        # The response's audio_content is binary.
        
        # Define a unique file name using either timestamp or uuid
        # unique_filename = "output_" + str(int(time.time())) + ".mp3"  # Using timestamp
        # # or
        filename = os.path.join(self.dir_path, "output.mp3")  # Using uuid

        # Check if the file exists, if not create a new one
        if not os.path.exists(filename):
            with open(filename, 'wb') as out:
                out.write(response.audio_content)

        return filename

    def convert(self, text):
        # Split the text into chunks
        chunks = self.split_file(text)

        # Initialize an empty AudioSegment
        final_audio = AudioSegment.empty()

        for text_chunk in chunks:
            # with open(chunk, "r") as file:
            #     file_contents = file.read()
                # Get the filename of the audio chunk
            audio_chunk_filename = self.convert_to_speech(text_chunk)
                
            # Load the audio chunk and append it to final_audio
            audio_chunk = AudioSegment.from_mp3(audio_chunk_filename)
            final_audio += audio_chunk
            
        return final_audio
