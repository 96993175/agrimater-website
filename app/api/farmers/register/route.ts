import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, village, district, state, farmSize, cropTypes, experience, fpoMember, additionalInfo } = body

    // Validate required fields
    if (!name || !phone || !village || !district || !state) {
      return NextResponse.json({ error: "Name, phone, village, district, and state are required" }, { status: 400 })
    }

    // Check if farmer already exists
    const existingFarmer = await db.farmers.findByPhone(phone)
    if (existingFarmer) {
      return NextResponse.json({ error: "A farmer with this phone number is already registered" }, { status: 409 })
    }

    // Create farmer record in MongoDB
    const farmer = await db.farmers.create({
      name,
      phone,
      village,
      district,
      state,
      farmSize: farmSize || "",
      cropTypes: cropTypes || "",
      experience: experience || "",
      fpoMember: fpoMember || "no",
      additionalInfo: additionalInfo || "",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Farmer registration successful - saved to MongoDB",
        id: farmer.id,
        farmer: {
          id: farmer.id,
          name: farmer.name,
          status: farmer.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Farmer registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  const farmers = db.farmers.findAll()
  return NextResponse.json({ farmers })
}
