// src/background.ts
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export type AuthStatus = {
  isAuthenticated: boolean
  user?: {
    name: string
    email: string
  }
}

export async function checkAuthStatus(): Promise<AuthStatus> {
  try {
    const response = await fetch("http://localhost:3000/api/auth/check", {
      credentials: "include"
    })

    const data = await response.json()
    await storage.set("authStatus", data)
    return data
  } catch (error) {
    console.error("Auth check failed:", error)
    return { isAuthenticated: false }
  }
}

setInterval(checkAuthStatus, 3600000) 


