import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.MONGODB_URI) {
      console.error('[/api/conversation POST] MONGODB_URI is not set in environment');
      return NextResponse.json({ 
        error: "Conversation service is temporarily unavailable" 
      }, { status: 503 })
    }
    
    const { sessionId, userId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Check if conversation exists
    const existing = await db.conversations.findBySessionId(sessionId)
    
    if (existing) {
      return NextResponse.json({ conversation: existing }, { status: 200 })
    }

    // Create new conversation
    const conversation = await db.conversations.create({
      sessionId,
      userId,
      messages: [],
    })

    return NextResponse.json({ conversation }, { status: 201 })
  } catch (error: any) {
    console.error("Conversation API error:", error)
    
    // Check if it's a MongoDB connection error
    if (error.message?.includes('Invalid scheme') || error.message?.includes('mongodb://') || error.message?.includes('mongodb+srv://')) {
      return NextResponse.json({ 
        error: "Database service is temporarily unavailable" 
      }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")
    const limit = parseInt(searchParams.get("limit") || "5")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.MONGODB_URI) {
      console.error('[/api/conversation] MONGODB_URI is not set in environment');
      return NextResponse.json({ 
        error: "Conversation service is temporarily unavailable" 
      }, { status: 503 })
    }
    
    const messages = await db.conversations.getRecentMessages(sessionId, limit)
    
    return NextResponse.json({ messages }, { status: 200 })
  } catch (error: any) {
    console.error("Conversation API error:", error)
    
    // Check if it's a MongoDB connection error
    if (error.message?.includes('Invalid scheme') || error.message?.includes('mongodb://') || error.message?.includes('mongodb+srv://')) {
      return NextResponse.json({ 
        error: "Database service is temporarily unavailable" 
      }, { status: 503 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
