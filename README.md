# TextToSpeech Interface

Text to speech web page, which uses nextJS as a frontend and Django as a backend. The web page generates an mp3 audio file from the users input text.

1. Create an application on cloud.google.com and create the credentials for the service account. Extract the json file and place them inside **"/backend/backend/Text2Speech/script/credentials.json"
2. Create a venv in the parent folder by running the command 
````
python -m venv venv
````
then activate the virtual environment
````
.\venv\scripts\activate
````
and install the requirements
````
pip install -r .\requirements.txt\
````

3. Activate the backend
````
cd .\backend\
python.exe .\manage.py makemigrations
python.exe .\manage.py runserver
````"# text-to-speech" 
