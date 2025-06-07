'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Implement session check
      setLoading(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement sign in
      setLoading(true)
      // Mock user for now - validate password length
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      setUser({
        id: '1',
        email,
        name: 'Test User'
      })
      setLoading(false)
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // TODO: Implement sign out
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement sign up
      setLoading(true)
      // Mock user for now
      setUser({
        id: '1',
        email,
        name
      })
      setLoading(false)
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 