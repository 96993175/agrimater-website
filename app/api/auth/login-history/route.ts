import { NextRequest, NextResponse } from "next/server"
import { getUserLoginHistory } from "@/lib/login-history"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20")

    // Fetch login history
    const history = await getUserLoginHistory(decoded.userId, limit)

    return NextResponse.json({
      success: true,
      history: history.map((entry) => ({
        id: entry.id,
        timestamp: entry.timestamp,
        ipAddress: entry.ipAddress,
        deviceType: entry.deviceType,
        location: entry.location,
        success: entry.success,
        failureReason: entry.failureReason,
      })),
    })
  } catch (error) {
    console.error("Login history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
