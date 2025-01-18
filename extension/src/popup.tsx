// src/popup.tsx
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import type { AuthStatus } from "./background"

function IndexPopup() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storage = new Storage()
        // Try to get cached status first
        const cachedStatus = await storage.get("authStatus")
        if (cachedStatus) {
          setAuthStatus(cachedStatus)
        }

        // Then fetch fresh status
        const response = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include"
        })
        const freshStatus = await response.json()
        setAuthStatus(freshStatus)
        await storage.set("authStatus", freshStatus)
      } catch (error) {
        console.error("Failed to check auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return <div className="p-4">Checking authentication...</div>
  }

  return (
    <div className="p-4">
      {authStatus.isAuthenticated ? (
        <div>
          <h2 className="font-bold">Logged In</h2>
          <p>Welcome, {authStatus.user?.name}</p>
        </div>
      ) : (
        <div>
          <h2 className="font-bold">Not Logged In</h2>
          <p>Please sign in to continue</p>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
