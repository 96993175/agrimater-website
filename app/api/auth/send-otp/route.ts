import { NextResponse } from "next/server"
import { generateOTP, storeOTP } from "@/lib/otp"
import { sendOTPEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP()

    // Store OTP
    storeOTP(email, otp)

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, name)

    if (!emailResult.success) {
      return NextResponse.json(
        { error: `Failed to send OTP: ${emailResult.error}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully to your email",
    })
  } catch (error: any) {
    console.error("Send OTP Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to send OTP" },
      { status: 500 }
    )
  }
}
