import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      hasGroqKey: !!process.env.GROQ_API_KEY,
      groqModel: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      hasMongoUri: !!process.env.MONGODB_URI,
      hasSendgridKey: !!process.env.SENDGRID_API_KEY,
    },
    routes: {
      chat: "/api/chat",
      chatHealth: "/api/chat/health",
      auth: "/api/auth/*",
      contact: "/api/contact",
      farmers: "/api/farmers/register",
      retailers: "/api/retailers/register",
    },
  })
}
