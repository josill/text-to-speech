# TextToSpeech Interface

This application is a text to speech web page, which uses Google API to convert the users input text to a mp3 audio file. The user can choose between four voices. Frontend is in nextJS and backend in Python Django.

## Backend setup

1. Create an application on www.cloud.google.com and enable the text to speech plugin. Create the credentials for the service account. Extract the json file and place them inside 	
> text-to-sppech/backend/converter/credentials.json 

2. Create a venv in the backend folder by running the command 
````
cd text-to-speech
cd backend
pip install virtualenv
````
````
python -m venv venv
````
or on Mac:
````
virtualenv venv
````
then activate the virtual environment
````
.\venv\scripts\activate
````
or on Mac:
````
source venv/bin/activate
````
and install the requirements
````
pip install -r requirements.txt
````


3. Migrate and activate the backend
````
python.exe .\manage.py migrate
python.exe .\manage.py runserver
````

## Frontend setup

1. Install the existing packages from the frontend folder
````
cd text-to-speech
cd frontend
npm install
````

2. Run the server
````
npm run dev
````

## One click launch (optional)

On Windows:

1. Open the Windows PowerShell, create a new $PROFILE text file and open it
````
New-Item -Path $PROFILE -ItemType File
notepad $PROFILE
````

2. Paste this inside
````
function start-frontend-tospeech {
    Start-Process -NoNewWindow cmd.exe "/k cd C:\Users\123\Desktop\Projects\text_to_speech\frontend & npm run dev"
}

function start-backend-topseech {
Start-Process -NoNewWindow cmd.exe "/k cd C:\Users\123\Desktop\Projects\text_to_speech\backend & .\venv\Scripts\Activate & python.exe .\manage.py runserver"
}

function text-to-speech {
start-frontend-tospeech
start-backend-topseech
Start-Process "http://localhost:3000"
}
````

3. Rerun Windows PowerShell and type text-to-speech to open the page

On Mac:

1. Open the shell profile file
````
nano ~/.bash_profile
````
2. Paste this inside and save the changes (press Control + X, then Y, and Enter)
````
text-to-speech() {
    # Change to Django backend directory
    cd /Users/goodi/Desktop/text-to-speech/backend

    # Activate virtual environment (assuming the venv folder is named 'venv')
    source venv/bin/activate

    # Start Django server in the background
    python manage.py runserver &

    # Open a new Terminal window and run the Next.js server
    osascript -e 'tell app "Terminal" to do script "cd /Users/goodi/Desktop/text-to-speech/frontend && npm run dev"'

    # Open the default browser at localhost:3000
    open http://localhost:3000
}
````
3. Rerun the terminal and type text-to-speech to open the page
`````
source ~/.bash_profile
text-to-speech
````
