// MongoDB connection for production
import { MongoClient } from 'mongodb'

import type { Contact, Farmer, Retailer, User } from "./types"

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
  return crypto.randomUUID()
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
}
