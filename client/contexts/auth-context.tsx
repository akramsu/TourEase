"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserRole = "authority" | "owner" | "tourist"

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  hasAttraction?: boolean // Track if owner has created their attraction
  profileCompleted?: boolean // Track if user has completed profile setup
  isNewUser?: boolean // Track if this is a new signup vs login
  phoneNumber?: string
  birthDate?: string
  postcode?: string
  gender?: string
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  updateUserAttraction: (hasAttraction: boolean) => void
  updateUserProfile: (profileData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      setUser({
        id: "1",
        email,
        name: email.split("@")[0],
        role,
        hasAttraction: role === "owner" ? true : undefined, // Existing users already have attraction
        profileCompleted: true, // Existing users already completed profile
        isNewUser: false, // This is a login, not signup
      })
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password && name) {
      setUser({
        id: "1",
        email,
        name,
        role,
        hasAttraction: role === "owner" ? false : undefined, // New owners need to create attraction
        profileCompleted: false, // New users need to complete profile
        isNewUser: true, // This is a new signup
      })
      return true
    }
    return false
  }

  const updateUserAttraction = (hasAttraction: boolean) => {
    if (user) {
      setUser({ ...user, hasAttraction })
    }
  }

  const updateUserProfile = (profileData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...profileData, profileCompleted: true })
    }
  }

  const logout = () => {
    setUser(null)
    // Force redirect to landing page
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user, updateUserAttraction, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
