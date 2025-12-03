// Simple JWT-like auth utilities (for demo purposes)
// In production, use proper JWT library with secure secret

const SECRET = "agrimater-secret-key-change-in-production"

export function createToken(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  const data = btoa(JSON.stringify({ ...payload, exp }))
  const signature = btoa(SECRET + data)
  return `${header}.${data}.${signature}`
}

export function verifyToken(token: string): { valid: boolean; payload?: Record<string, unknown> } {
  try {
    const [, data, signature] = token.split(".")
    const expectedSignature = btoa(SECRET + data)

    if (signature !== expectedSignature) {
      return { valid: false }
    }

    const payload = JSON.parse(atob(data))

    if (payload.exp < Date.now()) {
      return { valid: false }
    }

    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

export function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  return btoa(password + SECRET)
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
