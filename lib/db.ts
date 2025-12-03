// In-memory database for demo purposes
// Replace with MongoDB connection in production

import type { Contact, Farmer, Retailer, User } from "./types"

// In-memory stores
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
  contacts: {
    create: (data: Omit<Contact, "id" | "createdAt">) => {
      const contact: Contact = {
        ...data,
        id: generateId(),
        createdAt: new Date(),
      }
      contacts.push(contact)
      return contact
    },
    findAll: () => contacts,
    findById: (id: string) => contacts.find((c) => c.id === id),
  },

  farmers: {
    create: (data: Omit<Farmer, "id" | "status" | "createdAt">) => {
      const farmer: Farmer = {
        ...data,
        id: generateId(),
        status: "pending",
        createdAt: new Date(),
      }
      farmers.push(farmer)
      return farmer
    },
    findAll: () => farmers,
    findById: (id: string) => farmers.find((f) => f.id === id),
    findByPhone: (phone: string) => farmers.find((f) => f.phone === phone),
  },

  retailers: {
    create: (data: Omit<Retailer, "id" | "status" | "createdAt">) => {
      const retailer: Retailer = {
        ...data,
        id: generateId(),
        status: "pending",
        createdAt: new Date(),
      }
      retailers.push(retailer)
      return retailer
    },
    findAll: () => retailers,
    findById: (id: string) => retailers.find((r) => r.id === id),
    findByEmail: (email: string) => retailers.find((r) => r.email === email),
  },

  users: {
    create: (data: Omit<User, "id" | "createdAt">) => {
      const user: User = {
        ...data,
        id: generateId(),
        createdAt: new Date(),
      }
      users.push(user)
      return user
    },
    findAll: () => users,
    findById: (id: string) => users.find((u) => u.id === id),
    findByEmail: (email: string) => users.find((u) => u.email === email),
  },
}
