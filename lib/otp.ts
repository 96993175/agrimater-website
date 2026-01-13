// OTP Generation and Validation
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function isOTPExpired(createdAt: Date, expiryMinutes: number = 10): boolean {
  const now = new Date()
  const diffMs = now.getTime() - createdAt.getTime()
  const diffMins = diffMs / (1000 * 60)
  return diffMins > expiryMinutes
}

// In-memory OTP storage (for development)
// In production, use Redis or database
interface OTPRecord {
  otp: string
  email: string
  createdAt: Date
  attempts: number
}

const otpStore = new Map<string, OTPRecord>()

export function storeOTP(email: string, otp: string): void {
  otpStore.set(email.toLowerCase(), {
    otp,
    email: email.toLowerCase(),
    createdAt: new Date(),
    attempts: 0,
  })
}

export function verifyOTP(email: string, otp: string): { success: boolean; message: string } {
  email = email.toLowerCase()
  const record = otpStore.get(email)

  if (!record) {
    return { success: false, message: "No OTP found. Please request a new one." }
  }

  if (record.attempts >= 3) {
    otpStore.delete(email.toLowerCase())
    return { success: false, message: "Too many failed attempts. Please request a new OTP." }
  }

  if (isOTPExpired(record.createdAt)) {
    otpStore.delete(email.toLowerCase())
    return { success: false, message: "OTP has expired. Please request a new one." }
  }

  if (record.otp !== otp.toString()) {
    record.attempts++
    return { success: false, message: "Invalid OTP. Please try again." }
  }

  // OTP verified successfully
  otpStore.delete(email.toLowerCase())
  return { success: true, message: "OTP verified successfully!" }
}

export function getOTP(email: string): OTPRecord | undefined {
  return otpStore.get(email.toLowerCase())
}

export function deleteOTP(email: string): void {
  otpStore.delete(email.toLowerCase())
}
