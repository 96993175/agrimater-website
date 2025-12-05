import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { createToken, verifyPassword } from "@/lib/auth"
import { recordLoginAttempt, getRecentFailedLogins } from "@/lib/login-history"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    // Check for too many failed login attempts
    const failedAttempts = await getRecentFailedLogins(normalizedEmail, 15)
    if (failedAttempts >= 5) {
      await recordLoginAttempt({
        email: normalizedEmail,
        success: false,
        failureReason: 'Too many failed attempts',
        request,
      })
      return NextResponse.json({ 
        error: "Too many failed login attempts. Please try again in 15 minutes." 
      }, { status: 429 })
    }

    // Check MongoDB for user account
    try {
      const { db: database } = await db.connectToDatabase()
      const usersCollection = database.collection('users')
      
      const user = await usersCollection.findOne({ email: normalizedEmail })
      
      if (!user) {
        await recordLoginAttempt({
          email: normalizedEmail,
          success: false,
          failureReason: 'Account not found',
          request,
        })
        return NextResponse.json({ 
          error: "Account not found. Please create your account first." 
        }, { status: 404 })
      }

      // Verify password
      if (!verifyPassword(password, user.password)) {
        await recordLoginAttempt({
          userId: user._id.toString(),
          email: normalizedEmail,
          success: false,
          failureReason: 'Invalid password',
          request,
        })
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // Record successful login
      await recordLoginAttempt({
        userId: user._id.toString(),
        email: normalizedEmail,
        success: true,
        request,
      })

      // Create token
      const token = createToken({
        userId: user._id.toString(),
        email: user.email,
        userType: user.userType,
        name: user.name,
      })

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
          },
        },
        { status: 200 },
      )
    } catch (dbError) {
      console.error("Database error during login:", dbError)
      return NextResponse.json({ 
        error: "Unable to verify account. Please try again." 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
