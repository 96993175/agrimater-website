# Agrimater TTS Backend Server

This is a standalone Python Flask server that provides Text-to-Speech functionality using Microsoft Edge TTS.

## Deployment to Render

1. Create a new repository for this backend OR deploy from this folder directly
2. Push to GitHub
3. Go to https://render.com
4. Click "New +" → "Web Service"
5. Connect your repository
6. Render will auto-detect `render.yaml`
7. Click "Create Web Service"

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python tts_server.py
```

Server will run on `http://localhost:5001`

## Environment Variables

- `PORT` - Automatically set by Render (default: 5001)

## API Endpoints

- `GET /health` - Health check
- `POST /api/tts` - Text-to-Speech conversion
  - Body: `{"text": "Your text here"}`
  - Returns: Audio file (MP3)

## Tech Stack

- Python 3.12
- Flask 3.0.0
- edge-tts 7.2.3
- Microsoft Neural Voice: en-IN-NeerjaNeural
