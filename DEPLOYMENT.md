# Agrimater Website Deployment Guide

## 🚀 Deployment Steps

### 1. Deploy TTS Backend to Render

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Create Render Account**:
   - Go to [https://render.com](https://render.com)
   - Sign up with your GitHub account

3. **Deploy TTS Server**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `omkar67158-afk/agrimater-website`
   - Configure:
     - **Name**: `agrimater-tts-server`
     - **Runtime**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python tts_server.py`
     - **Plan**: Free (or upgrade for better performance)
   - Click "Create Web Service"

4. **Note your Render URL**:
   - After deployment, you'll get a URL like: `https://agrimater-tts-server.onrender.com`
   - Copy this URL - you'll need it for Vercel

### 2. Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Update Environment Variables**:
   - Create `.env.production` with your Render TTS URL:
   ```
   NEXT_PUBLIC_TTS_SERVER_URL=https://your-render-app-name.onrender.com
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.1-8b-instant
   MONGODB_URI=your_mongodb_uri_here
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM=no-reply@agrimater.com
   ```

3. **Deploy to Vercel**:

   **Option A: Via Vercel Dashboard** (Recommended)
   - Go to [https://vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New" → "Project"
   - Import your repository: `omkar67158-afk/agrimater-website`
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: ./
     - **Build Command**: `npm run build` or `pnpm build`
     - **Output Directory**: .next
   - Add Environment Variables (from `.env.production`):
     - `NEXT_PUBLIC_TTS_SERVER_URL`
     - `GROQ_API_KEY`
     - `GROQ_MODEL`
     - `MONGODB_URI`
     - `SENDGRID_API_KEY`
     - `SENDGRID_FROM`
   - Click "Deploy"

   **Option B: Via CLI**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Add environment variables when asked

4. **Your site will be live at**: `https://agrimater-website.vercel.app`

### 3. Update CORS Settings

After deployment, update the TTS server to allow your Vercel domain:

In `tts_server.py`, the CORS is already set to allow all origins. For production, you may want to restrict it:

```python
CORS(app, origins=['https://agrimater-website.vercel.app', 'https://www.agrimater.com'])
```

### 4. Custom Domain (Optional)

**For Vercel:**
1. Go to your project → Settings → Domains
2. Add your custom domain (e.g., `agrimater.com`)
3. Follow DNS configuration instructions

**For Render:**
1. Go to your service → Settings → Custom Domains
2. Add custom domain for TTS API (e.g., `api.agrimater.com`)

### 5. Environment Variables Checklist

Make sure these are set in Vercel:
- ✅ `NEXT_PUBLIC_TTS_SERVER_URL` - Your Render TTS server URL
- ✅ `GROQ_API_KEY` - Your Groq API key
- ✅ `GROQ_MODEL` - llama-3.1-8b-instant
- ✅ `MONGODB_URI` - Your MongoDB connection string
- ✅ `SENDGRID_API_KEY` - SendGrid API key
- ✅ `SENDGRID_FROM` - Email sender address

### 6. Test Your Deployment

1. **Test TTS Server**:
   ```bash
   curl https://agrimater-tts-server.onrender.com/health
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Go to `/investor-access` page
   - Test the AI voice chat

### 7. Important Notes

- **Render Free Tier**: Server may spin down after 15 minutes of inactivity (first request after inactivity takes ~30 seconds to wake up)
- **Vercel Free Tier**: Unlimited bandwidth, serverless functions have 10-second timeout
- **TTS Fallback**: The app will fallback to browser TTS if Render server is unavailable

### 8. Monitoring

- **Render Dashboard**: Monitor logs, metrics, and deployments
- **Vercel Dashboard**: View analytics, logs, and performance
- **Vercel Analytics**: Add `@vercel/analytics` for visitor insights

### 9. CI/CD (Automatic Deployments)

Both Render and Vercel will automatically redeploy when you push to your main branch!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

🎉 Your website is now live in production!
