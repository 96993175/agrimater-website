import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Use Microsoft Edge TTS (free, no API key required)
    const voice = "en-US-JennyNeural"
    const rate = "+0%"
    const pitch = "+0Hz"
    
    // Edge TTS endpoint (free service)
    const edgeTtsUrl = `https://eastus.api.speech.microsoft.com/cognitiveservices/v1`
    
    // For Edge TTS, we'll use the Web Speech API through the browser instead
    // This endpoint requires authentication, so we'll return instructions for browser-based Edge TTS
    
    return NextResponse.json(
      { 
        error: "Use browser-based Edge TTS",
        useEdgeTTS: true,
        voice: voice
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TTS API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
