import { NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { email, otp, name } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      )
    }

    // Verify OTP
    const result = verifyOTP(email, otp)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Send welcome email (optional)
    if (name) {
      await sendWelcomeEmail(email, name)
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error("Verify OTP Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to verify OTP" },
      { status: 500 }
    )
  }
}
