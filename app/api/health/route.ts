import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check environment variables
    const envChecks = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET || !!process.env.JWT_SECRET,
      SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
    };

    // Overall status
    const isHealthy = Object.values(envChecks).every(check => check === true);

    return NextResponse.json({
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      checks: {
        environmentVariables: envChecks,
        overall: isHealthy
      }
    }, { 
      status: isHealthy ? 200 : 503 
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: "Health check failed"
    }, { 
      status: 500 
    });
  }
}