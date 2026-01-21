"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface User {
  id: string
  name: string
  email: string
  userType: string
}

// Cache for storing auth state and timestamp
let cachedAuthState: {
  user: User | null;
  isAuthenticated: boolean;
  timestamp: number;
} | null = null;

export function useAuth() {
  const [user, setUser] = useState<User | null>(cachedAuthState?.user || null)
  const [isLoading, setIsLoading] = useState(cachedAuthState === null)
  const [isAuthenticated, setIsAuthenticated] = useState(cachedAuthState?.isAuthenticated || false)
  
  // Ref to track if auth check has been performed in this session
  const hasCheckedAuthRef = useRef(false)

  const checkAuth = useCallback(async () => {
    // Prevent multiple concurrent auth checks
    if (hasCheckedAuthRef.current) {
      return
    }
    
    hasCheckedAuthRef.current = true
    
    try {
      // Check if we have cached auth state and it's still valid (less than 5 minutes old)
      const now = Date.now()
      const cacheValid = cachedAuthState && (now - cachedAuthState.timestamp < 5 * 60 * 1000) // 5 minutes
      
      if (cacheValid) {
        // Use cached state if still valid
        setUser(cachedAuthState!.user)
        setIsAuthenticated(cachedAuthState!.isAuthenticated)
        setIsLoading(false)
        return
      }
      
      const token = localStorage.getItem("agrimater_token")
      if (!token) {
        // Clear cache if no token
        cachedAuthState = null
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const userData = data.user
        
        // Update state
        setUser(userData)
        setIsAuthenticated(true)
        
        // Cache the auth state
        cachedAuthState = {
          user: userData,
          isAuthenticated: true,
          timestamp: now
        }
      } else {
        localStorage.removeItem("agrimater_token")
        // Clear cache if auth fails
        cachedAuthState = null
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      // Clear cache and auth state on error
      cachedAuthState = null
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, []) // Empty dependency array - no external dependencies

  useEffect(() => {
    // Only check auth once per session
    if (!hasCheckedAuthRef.current) {
      checkAuth()
    }
    
    // Cleanup function
    return () => {
      // Reset ref on unmount to allow fresh auth check if component remounts
      hasCheckedAuthRef.current = false
    }
  }, []) // Empty dependency array - only run once on mount

  const logout = useCallback(() => {
    localStorage.removeItem("agrimater_token")
    setUser(null)
    setIsAuthenticated(false)
    // Clear cache on logout
    cachedAuthState = null
    hasCheckedAuthRef.current = false
    window.location.href = "/login"
  }, [])

  // Function to manually clear cache if needed
  const clearAuthCache = useCallback(() => {
    cachedAuthState = null
    hasCheckedAuthRef.current = false
  }, [])

  return { user, isLoading, isAuthenticated, logout, checkAuth, clearAuthCache }
}
