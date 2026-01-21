import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { ConversationMessage } from "@/lib/types"
import { groqClient } from "@/lib/groqAI"

export async function POST(request: NextRequest) {
  console.log("[/api/chat] Incoming POST request", {
    method: request.method,
    url: request.url,
  })

  try {
    const { message, sessionId } = await request.json()
    console.log("[/api/chat] Received message:", message, "sessionId:", sessionId)

    if (!message) {
      console.error("[/api/chat] Error: Missing message in request body")
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Use the new Groq client which handles all the advanced features
    const result = await groqClient.chatCompletionWithModelFallback(message, sessionId);
    const aiResponse = result.response;
    
    console.log(`[/api/chat] Successfully got response from model: ${result.modelUsed}`);

    // Save conversation to database if sessionId is provided
    if (sessionId) {
      try {
        console.log(`[/api/chat] Saving conversation for session: ${sessionId}`)
        
        // Save user message (upsert will create conversation if needed)
        const userSaved = await db.conversations.addMessage(sessionId, {
          role: "user",
          content: message,
          timestamp: new Date(),
        })

        // Save assistant response
        const assistantSaved = await db.conversations.addMessage(sessionId, {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        })

        if (userSaved && assistantSaved) {
          console.log("[/api/chat] Conversation saved successfully to database")
        } else {
          console.error("[/api/chat] Failed to save one or more messages")
        }
      } catch (dbError) {
        console.error("[/api/chat] Failed to save conversation:", dbError)
        // Don't fail the request if DB save fails
      }
    } else {
      console.warn("[/api/chat] No sessionId provided, conversation not saved")
    }

    console.log("[/api/chat] Success - AI Response:", aiResponse.substring(0, 100) + "...")
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("[/api/chat] Exception:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}