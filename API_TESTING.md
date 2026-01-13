# API Route Testing Guide

## ✅ All Routes Verified

### Frontend → Backend Architecture
```
Frontend (Next.js Client)
    ↓ fetch("/api/chat")
Backend (Next.js API Route: app/api/chat/route.ts)
    ↓ fetch("https://api.groq.com/openai/v1/chat/completions")
Groq AI (LLM Service)
```

## 🔧 Environment Variables

### Required in `.env.local` and `.env.production`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama3-70b-8192
```

## 📍 API Endpoints

### 1. Health Check - `/api/health`
**Method:** GET  
**Purpose:** Verify server is running and env vars are loaded  
**Test:**
```bash
curl http://localhost:3000/api/health
```
**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-05T...",
  "env": {
    "hasGroqKey": true,
    "groqModel": "llama3-70b-8192",
    "hasMongoUri": true,
    "hasSendgridKey": true
  },
  "routes": { ... }
}
```

### 2. Chat Health - `/api/chat/health`
**Method:** GET  
**Purpose:** Test Groq API connection with actual request  
**Test:**
```bash
curl http://localhost:3000/api/chat/health
```
**Expected Response:**
```json
{
  "ok": true,
  "model": "llama3-70b-8192",
  "sample": "pong"
}
```

### 3. Chat - `/api/chat`
**Method:** POST  
**Purpose:** Send messages to AI and get responses  
**Test:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Agrimater?"}'
```
**Expected Response:**
```json
{
  "response": "Agrimater is transforming India's agricultural supply chain..."
}
```

## 🐛 Debugging 404 Errors

### If you get 404 on `/api/chat`:

1. **Check file exists:**
   ```
   app/api/chat/route.ts ✓ EXISTS
   ```

2. **Verify export:**
   ```typescript
   export async function POST(request: NextRequest) { ... }
   ```

3. **Check dev server logs:**
   - Should see: `[/api/chat] Incoming POST request`
   - If not, route isn't being hit

4. **Verify frontend URL:**
   ```typescript
   fetch("/api/chat", { method: "POST", ... })
   // NOT: fetch("/chat") ❌
   // NOT: fetch("/api/chat/") ❌ (no trailing slash)
   ```

5. **Check browser console:**
   ```
   [Frontend] Sending message to /api/chat: ...
   [Frontend] Response status: 200 OK
   ```

## 🚀 Deployment Checklist

### For Vercel/Netlify:
- ✅ Add env vars in dashboard (GROQ_API_KEY, GROQ_MODEL)
- ✅ Ensure `app/api/chat/route.ts` is in git
- ✅ No trailing slashes in routes
- ✅ Use relative URLs (`/api/chat` not `http://...`)

### For Render/Railway (Backend):
- ✅ Set env vars
- ✅ Expose health endpoint
- ✅ Update frontend to use `process.env.NEXT_PUBLIC_BACKEND_URL`

## 📊 Logging

### Backend logs show:
```
[/api/chat] Incoming POST request { method: 'POST', url: '...' }
[/api/chat] Received message: "What is Agrimater?"
[/api/chat] Success - AI Response: Agrimater is...
```

### Frontend logs show:
```
[Frontend] Sending message to /api/chat: What is Agrimater?
[Frontend] Response status: 200 OK
[Frontend] Response data: { response: "..." }
[Frontend] AI Response received: Agrimater is...
```

## ✨ Model Configuration

- **Default Model:** `llama3-70b-8192` (no `groq/` prefix)
- **Fallback:** If model decommissioned → auto-switch to `llama3-70b-8192`
- **Configurable:** Set `GROQ_MODEL` env var

## 🔐 Security

- ✅ API key only in server env (not exposed to client)
- ✅ No hardcoded localhost URLs
- ✅ CORS handled by Next.js automatically
- ✅ Rate limiting by Groq API

## 📝 Files Modified

1. `app/api/chat/route.ts` - Main chat endpoint with logging
2. `app/api/chat/health/route.ts` - Groq connection test
3. `app/api/health/route.ts` - General health check
4. `app/investor-access/page.tsx` - Frontend with logging
5. `.env.local` - Development env vars
6. `.env.production` - Production env vars

## ✅ All Fixed Issues

- ✅ Removed deprecated model `llama-3.1-70b-versatile`
- ✅ Updated to `llama3-70b-8192`
- ✅ Added comprehensive logging
- ✅ Created health check endpoints
- ✅ Fixed model name format (removed `groq/` prefix)
- ✅ Added fallback for decommissioned models
- ✅ No trailing slashes in routes
- ✅ No hardcoded URLs
- ✅ Proper error handling with full JSON logging
