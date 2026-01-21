// MongoDB connection for production
import { MongoClient } from 'mongodb'

import type { Contact, Farmer, Retailer, User, Conversation, ConversationMessage } from "./types"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://om67156715_db_user:XMW6gKsdPzS49mVe@cluster0.xhatnbd.mongodb.net/?appName=Cluster0"
const DB_NAME = "agrimater"

let cachedClient: MongoClient | null = null
let cachedDb: any = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    console.log('Connecting to MongoDB...')
    const client = await MongoClient.connect(MONGODB_URI, {
      tls: true,
      tlsAllowInvalidCertificates: false,
    })
    const db = client.db(DB_NAME)

    cachedClient = client
    cachedDb = db

    console.log('MongoDB connected successfully to database:', DB_NAME)
    return { client, db }
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
}

// In-memory stores (fallback)
export const contacts: Contact[] = []
export const farmers: Farmer[] = []
export const retailers: Retailer[] = []
export const users: User[] = []

// Helper functions
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments where crypto is not available
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Database operations
export const db = {
  connectToDatabase,
  
  contacts: {
    create: async (data: Omit<Contact, "id" | "createdAt">) => {
      try {
        const { db } = await connectToDatabase()
        const contact: Contact = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
        }
        await db.collection('contacts').insertOne(contact)
        return contact
      } catch (error) {
        console.error('MongoDB error, using in-memory fallback:', error)
        const contact: Contact = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
        }
        contacts.push(contact)
        return contact
      }
    },
    findAll: () => contacts,
    findById: (id: string) => contacts.find((c) => c.id === id),
  },

  farmers: {
    create: async (data: Omit<Farmer, "id" | "status" | "createdAt">) => {
      try {
        const { db } = await connectToDatabase()
        const farmer: Farmer = {
          ...data,
          id: generateId(),
          status: "pending",
          createdAt: new Date(),
        }
        await db.collection('farmers').insertOne(farmer)
        return farmer
      } catch (error) {
        console.error('MongoDB error, using in-memory fallback:', error)
        const farmer: Farmer = {
          ...data,
          id: generateId(),
          status: "pending",
          createdAt: new Date(),
        }
        farmers.push(farmer)
        return farmer
      }
    },
    findAll: async () => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('farmers').find({}).toArray()
      } catch (error) {
        return farmers
      }
    },
    findById: async (id: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('farmers').findOne({ id })
      } catch (error) {
        return farmers.find((f) => f.id === id)
      }
    },
    findByPhone: async (phone: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('farmers').findOne({ phone })
      } catch (error) {
        return farmers.find((f) => f.phone === phone)
      }
    },
  },

  retailers: {
    create: async (data: Omit<Retailer, "id" | "status" | "createdAt">) => {
      try {
        console.log('Creating retailer with data:', data)
        const { db } = await connectToDatabase()
        const retailer: Retailer = {
          ...data,
          id: generateId(),
          status: "pending",
          createdAt: new Date(),
        }
        console.log('Inserting retailer into MongoDB:', retailer)
        const result = await db.collection('retailers').insertOne(retailer)
        console.log('MongoDB insert result:', result)
        return retailer
      } catch (error) {
        console.error('MongoDB error, using in-memory fallback:', error)
        const retailer: Retailer = {
          ...data,
          id: generateId(),
          status: "pending",
          createdAt: new Date(),
        }
        retailers.push(retailer)
        return retailer
      }
    },
    findAll: async () => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('retailers').find({}).toArray()
      } catch (error) {
        return retailers
      }
    },
    findById: async (id: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('retailers').findOne({ id })
      } catch (error) {
        return retailers.find((r) => r.id === id)
      }
    },
    findByEmail: async (email: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('retailers').findOne({ email })
      } catch (error) {
        return retailers.find((r) => r.email === email)
      }
    },
  },

  users: {
    create: async (data: Omit<User, "id" | "createdAt">) => {
      try {
        const { db } = await connectToDatabase()
        const user: User = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
        }
        await db.collection('users').insertOne(user)
        return user
      } catch (error) {
        console.error('MongoDB error, using in-memory fallback:', error)
        const user: User = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
        }
        users.push(user)
        return user
      }
    },
    findAll: async () => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('users').find({}).toArray()
      } catch (error) {
        return users
      }
    },
    findById: async (id: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('users').findOne({ id })
      } catch (error) {
        return users.find((u) => u.id === id)
      }
    },
    findByEmail: async (email: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('users').findOne({ email })
      } catch (error) {
        return users.find((u) => u.email === email)
      }
    },
  },
  
  conversations: {
    create: async (data: Omit<Conversation, "id" | "createdAt" | "updatedAt">) => {
      try {
        const { db } = await connectToDatabase()
        
        // Check if conversation already exists
        const existing = await db.collection('conversations').findOne({ sessionId: data.sessionId })
        if (existing) {
          console.log(`[DB] Conversation already exists for session ${data.sessionId}`)
          return existing as Conversation
        }
        
        const conversation: Conversation = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        await db.collection('conversations').insertOne(conversation)
        console.log(`[DB] Created new conversation for session ${data.sessionId}`)
        return conversation
      } catch (error) {
        console.error('MongoDB error creating conversation:', error)
        throw error
      }
    },
    
    findBySessionId: async (sessionId: string) => {
      try {
        const { db } = await connectToDatabase()
        return await db.collection('conversations').findOne({ sessionId })
      } catch (error) {
        console.error('MongoDB error finding conversation:', error)
        return null
      }
    },
    
    addMessage: async (sessionId: string, message: ConversationMessage) => {
      try {
        const { db } = await connectToDatabase()
        const result = await db.collection('conversations').updateOne(
          { sessionId },
          { 
            $push: { messages: message },
            $set: { updatedAt: new Date() },
            $setOnInsert: { 
              id: generateId(),
              sessionId: sessionId,
              createdAt: new Date()
            }
          },
          { upsert: true } // Create if doesn't exist
        )
        console.log(`[DB] Message added to session ${sessionId}. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`)
        return true
      } catch (error) {
        console.error('MongoDB error adding message:', error)
        return false
      }
    },
    
    getRecentMessages: async (sessionId: string, limit: number = 5) => {
      try {
        const { db } = await connectToDatabase()
        const conversation = await db.collection('conversations').findOne({ sessionId })
        if (!conversation || !conversation.messages) {
          console.log(`[DB] No conversation found for session ${sessionId}`)
          return []
        }
        
        // Get last N conversations (user message + assistant response = 1 conversation)
        const messages = conversation.messages
        const recentMessages = messages.slice(-limit * 2) // Get last N pairs of messages
        console.log(`[DB] Retrieved ${recentMessages.length} recent messages for session ${sessionId}`)
        return recentMessages
      } catch (error) {
        console.error('MongoDB error getting recent messages:', error)
        return []
      }
    },
  },
}