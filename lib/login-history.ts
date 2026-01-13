import { db } from "./db"

export interface LoginHistory {
  id: string
  userId: string
  email: string
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  deviceType?: string
  location?: {
    country?: string
    city?: string
  }
  success: boolean
  failureReason?: string
}

export async function recordLoginAttempt(data: {
  userId?: string
  email: string
  success: boolean
  failureReason?: string
  request?: Request
}): Promise<LoginHistory> {
  const { connectToDatabase } = db
  const { db: database } = await connectToDatabase()

  // Parse request headers for additional info
  let ipAddress: string | undefined
  let userAgent: string | undefined
  let deviceType: string | undefined

  if (data.request) {
    // Get IP address
    ipAddress = 
      data.request.headers.get('x-forwarded-for')?.split(',')[0] ||
      data.request.headers.get('x-real-ip') ||
      'unknown'

    // Get user agent
    userAgent = data.request.headers.get('user-agent') || 'unknown'

    // Determine device type from user agent
    if (userAgent) {
      if (/mobile/i.test(userAgent)) {
        deviceType = 'mobile'
      } else if (/tablet/i.test(userAgent)) {
        deviceType = 'tablet'
      } else {
        deviceType = 'desktop'
      }
    }
  }

  const loginRecord: LoginHistory = {
    id: crypto.randomUUID(),
    userId: data.userId || 'unknown',
    email: data.email,
    timestamp: new Date(),
    ipAddress,
    userAgent,
    deviceType,
    success: data.success,
    failureReason: data.failureReason,
  }

  try {
    await database.collection('login_history').insertOne(loginRecord)
    console.log('✅ Login attempt recorded:', {
      email: data.email,
      success: data.success,
      timestamp: loginRecord.timestamp,
    })
  } catch (error) {
    console.error('❌ Failed to record login attempt:', error)
  }

  return loginRecord
}

export async function getUserLoginHistory(userId: string, limit = 10): Promise<LoginHistory[]> {
  const { connectToDatabase } = db
  const { db: database } = await connectToDatabase()

  try {
    const history = await database
      .collection('login_history')
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray()

    return history as LoginHistory[]
  } catch (error) {
    console.error('Failed to fetch login history:', error)
    return []
  }
}

export async function getRecentFailedLogins(email: string, minutes = 15): Promise<number> {
  const { connectToDatabase } = db
  const { db: database } = await connectToDatabase()

  try {
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000)
    
    const count = await database
      .collection('login_history')
      .countDocuments({
        email,
        success: false,
        timestamp: { $gte: cutoffTime },
      })

    return count
  } catch (error) {
    console.error('Failed to get failed login count:', error)
    return 0
  }
}
