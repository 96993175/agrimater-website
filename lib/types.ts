// Type definitions for Agrimater

export interface Contact {
  id: string
  name: string
  email: string
  category: string
  message: string
  createdAt: Date
}

export interface Farmer {
  id: string
  name: string
  phone: string
  village: string
  district: string
  state: string
  farmSize: string
  cropTypes: string
  experience: string
  fpoMember: string
  additionalInfo: string
  status: "pending" | "verified" | "rejected"
  createdAt: Date
}

export interface Retailer {
  id: string
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  locations: string
  requirements: string
  status: "pending" | "active" | "inactive"
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  userType: "farmer" | "retailer" | "logistics" | "investor" | "admin"
  createdAt: Date
}

export interface AuthToken {
  userId: string
  email: string
  userType: string
  exp: number
}

export interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  userId?: string
  sessionId: string
  messages: ConversationMessage[]
  createdAt: Date
  updatedAt: Date
}
