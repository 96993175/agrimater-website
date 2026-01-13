import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "change-this-secret-in-production"

// Create token
export function createToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

// Verify token
export function verifyToken(token: string): { valid: boolean; payload?: any } {
  try {
    const decoded = jwt.verify(token, SECRET)
    return { valid: true, payload: decoded }
  } catch {
    return { valid: false }
  }
}

// Hash password
export function hashPassword(password: string): string {
  return Buffer.from(password + SECRET).toString("base64")
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
