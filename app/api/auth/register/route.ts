import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword, createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, userType } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Check if user already exists (await the async lookup)
    const normalizedEmail = email.toLowerCase()
    const existingUser = await db.users.findByEmail(normalizedEmail)
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    // Create user (OTP verification is handled before this endpoint is called)
    const user = await db.users.create({
      name,
      email: normalizedEmail,
      password: hashPassword(password),
      userType: userType || "farmer",
    })

    // Create token for auto-login
    const token = createToken({
      userId: user.id,
      email: user.email,
      userType: user.userType,
      name: user.name,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
