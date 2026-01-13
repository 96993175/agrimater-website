import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, contactName, email, phone, businessType, locations, requirements } = body

    // Validate required fields
    if (!businessName || !contactName || !email || !phone) {
      return NextResponse.json({ error: "Business name, contact name, email, and phone are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if retailer already exists
    const existingRetailer = await db.retailers.findByEmail(email)
    if (existingRetailer) {
      return NextResponse.json({ error: "A retailer with this email is already registered" }, { status: 409 })
    }

    // Create retailer record in MongoDB
    const retailer = await db.retailers.create({
      businessName,
      contactName,
      email,
      phone,
      businessType: businessType || "",
      locations: locations || "",
      requirements: requirements || "",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Retailer registration successful - saved to MongoDB",
        id: retailer.id,
        retailer: {
          id: retailer.id,
          businessName: retailer.businessName,
          status: retailer.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Retailer registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  const retailers = await db.retailers.findAll()
  return NextResponse.json({ retailers })
}
