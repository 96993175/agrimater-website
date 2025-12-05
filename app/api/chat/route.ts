import { NextRequest, NextResponse } from "next/server"

// Groq supported models - use exact names from Groq API
const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"
const API_KEY = process.env.GROQ_API_KEY

export async function POST(request: NextRequest) {
  console.log("[/api/chat] Incoming POST request", {
    method: request.method,
    url: request.url,
  })

  try {
    const { message } = await request.json()
    console.log("[/api/chat] Received message:", message)

    if (!message) {
      console.error("[/api/chat] Error: Missing message in request body")
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!API_KEY) {
      console.error("[/api/chat] Error: Missing GROQ_API_KEY environment variable")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    let model = DEFAULT_MODEL
    console.log("[/api/chat] Using model:", model)

    const groqRequestBody = {
      model,
      messages: [
        {
          role: "system",
          content:
            "You are Agrimater AI assistant. You help people understand Agrimater's mission to transform India's agricultural supply chain with AI-powered transparency, verification, and logistics. Keep responses concise, friendly, and under 3 sentences.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    }

    console.log("[/api/chat] Groq request body:", JSON.stringify(groqRequestBody, null, 2))

    let response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(groqRequestBody),
    })

    let data = await response.json()
    console.log("[/api/chat] Groq response status:", response.status)
    console.log("[/api/chat] Groq response data:", JSON.stringify(data, null, 2))

    if (!response.ok) {
      console.error("[/api/chat] Groq API Error:", data)

      // Try alternative model names if current one fails
      const alternativeModels = [
        "llama-3.1-8b-instant",
        "llama3-70b-8192",
        "gemma-7b-it",
        "mixtral-8x7b-32768"
      ]

      for (const altModel of alternativeModels) {
        if (altModel === model) continue // Skip the one we already tried
        
        console.log(`[/api/chat] Trying alternative model: ${altModel}`)
        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ ...groqRequestBody, model: altModel }),
        })
        data = await response.json()

        if (response.ok) {
          console.log(`[/api/chat] Success with model: ${altModel}`)
          break
        } else {
          console.log(`[/api/chat] Failed with ${altModel}:`, data?.error?.message)
        }
      }

      if (!response.ok) {
        console.error("[/api/chat] All models failed. Last error:", data)
        return NextResponse.json(
          { error: "Failed to get AI response", details: data },
          { status: response.status }
        )
      }
    }

    const aiResponse = data?.choices?.[0]?.message?.content

    if (!aiResponse) {
      console.error("[/api/chat] Unexpected API response:", data)
      return NextResponse.json({ error: "Invalid API response", details: data }, { status: 500 })
    }

    console.log("[/api/chat] Success - AI Response:", aiResponse.substring(0, 100) + "...")
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("[/api/chat] Exception:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
