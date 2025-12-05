import { NextResponse } from "next/server"

const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"
const API_KEY = process.env.GROQ_API_KEY

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ ok: false, error: "Missing GROQ_API_KEY" }, { status: 500 })
  }

  const body = {
    model: DEFAULT_MODEL,
    messages: [
      { role: "system", content: "health check" },
      { role: "user", content: "ping" },
    ],
    max_tokens: 5,
    temperature: 0,
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Groq Health Error:", data)
      return NextResponse.json({ ok: false, status: response.status, error: data }, { status: response.status })
    }

    return NextResponse.json({ ok: true, model: DEFAULT_MODEL, sample: data?.choices?.[0]?.message?.content })
  } catch (error) {
    console.error("Groq Health Exception:", error)
    return NextResponse.json({ ok: false, error: "health check failed" }, { status: 500 })
  }
}
