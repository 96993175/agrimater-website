# TTS Server Setup

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install flask flask-cors pyttsx3 pywin32
```

2. Start the TTS server:
```bash
python tts_server.py
```

Server will run on: http://localhost:5001

## Usage

The Next.js app will automatically use this server for TTS if it's running.
If the server is not available, it falls back to browser's built-in TTS.

The TTS server uses **pyttsx3** which provides offline, high-quality text-to-speech using Windows SAPI voices.

## Environment Variable

Already configured in `.env.local`:
```
NEXT_PUBLIC_TTS_SERVER_URL=http://localhost:5001
```

For production, deploy the Python server separately and update the URL.

## Testing

Test the server directly:
```bash
curl -X POST http://localhost:5001/api/tts -H "Content-Type: application/json" -d "{\"text\":\"Hello, this is a test\"}" --output test.wav
```

Or check health:
```bash
curl http://localhost:5001/health
```
