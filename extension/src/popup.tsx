import "../style.css"

import {
  Bell,
  Bookmark,
  Loader2,
  LogIn,
  LogOut,
  RefreshCcwDot,
  Search
} from "lucide-react"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import type { AuthStatus } from "./background"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Separator } from "./components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./components/ui/tooltip"

type Bookmark = chrome.bookmarks.BookmarkTreeNode

// Define Chrome bookmark interface
interface ChromeBookmark {
  id: string
  title: string
  url?: string
  dateAdded?: number
  children?: ChromeBookmark[]
}

function IndexPopup() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false
  })
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [bookmarksLoading, setBookmarksLoading] = useState(true)
  const [aiReminder, setAiReminder] = useState<string | null>(null) // AI reminder state
  // Add these to your existing state declarations
  const [isReminderLoading, setIsReminderLoading] = useState(false)
  const [isSyncLoading, setIsSyncLoading] = useState(false)

  const handleSignIn = () => {
    window.open("http://localhost:3000/signup", "_blank")
  }
  const syncBookmarks = async (flattenedBookmarks: ChromeBookmark[]) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/bookmark-sync",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ bookmarks: flattenedBookmarks })
        }
      )

      console.log("Flatbookmark result:", flattenedBookmarks)
      const data = await response.json()
      console.log("Sync result:", data)
    } catch (error) {
      console.error("Failed to sync bookmarks:", error)
    }
  }
  // Use it with your existing code
  const fetchAndSyncBookmarks = async () => {
    setIsSyncLoading(true)
    try {
      const results = await chrome.bookmarks.getTree()
      const allBookmarks = flattenBookmarks(results[0])
      setBookmarks(allBookmarks)
      await syncBookmarks(allBookmarks)
    } catch (error) {
      console.error("Failed to fetch or sync bookmarks:", error)
    } finally {
      setIsSyncLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storage = new Storage()
        const cachedStatus = await storage.get("authStatus")
        if (cachedStatus) {
          setAuthStatus(cachedStatus)
        }
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

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const results = await chrome.bookmarks.getTree()
        const allBookmarks = flattenBookmarks(results[0])
        setBookmarks(allBookmarks)
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error)
      } finally {
        setBookmarksLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  const flattenBookmarks = (node: Bookmark): Bookmark[] => {
    let bookmarks: Bookmark[] = []
    if (node.url) {
      bookmarks.push(node)
    }
    if (node.children) {
      for (const child of node.children) {
        bookmarks = bookmarks.concat(flattenBookmarks(child))
      }
    }
    return bookmarks
  }

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAiReminder = async () => {
    setIsReminderLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/auth/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookmarks: filteredBookmarks,
          preferences: {
            /* User preferences */
          }
        }),
        credentials: "include" // Ensure cookies are included if needed
      })

      const data = await response.json()

      // Parse the reminder if it's a string
      let reminder = data.reminder
      if (typeof reminder === "string") {
        try {
          reminder = JSON.parse(reminder)
        } catch (error) {
          console.error("Error parsing reminder:", error)
          reminder = null
        }
      }

      if (reminder && reminder.title) {
        setAiReminder(reminder.title)
        new Notification("Reminder! You have missed your Bookmark!", {
          body: `${reminder.title} ${reminder.url}`,
          icon: "https://via.placeholder.com/64"
        })
      } else {
        console.error("Invalid reminder format:", reminder)
        setAiReminder("No reminder available")
      }
    } catch (error) {
      console.error("Error fetching AI reminder:", error)
      setAiReminder("Failed to fetch reminder")
    } finally {
      setIsReminderLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[200px] w-[300px] items-center justify-center p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="w-[350px] p-6 shadow-sm">
        {authStatus.isAuthenticated ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                Logged In
              </h2>
              <p className="text-sm text-muted-foreground">
                Welcome back, {authStatus.user?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <h3 className="font-medium">Your Bookmarks</h3>
              </div>

              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="max-h-[300px] space-y-2 overflow-y-auto">
                {bookmarksLoading ? (
                  <div className="flex items-center justify-center py-4 text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading bookmarks...
                  </div>
                ) : filteredBookmarks.length > 0 ? (
                  filteredBookmarks.map((bookmark) => (
                    <a
                      key={bookmark.id}
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border p-2 hover:bg-accent">
                      <div className="truncate font-medium">
                        {bookmark.title || bookmark.url}
                      </div>
                      {bookmark.title && (
                        <div className="truncate text-sm text-muted-foreground">
                          {bookmark.url}
                        </div>
                      )}
                    </a>
                  ))
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    No bookmarks found
                  </div>
                )}
              </div>
            </div>

            {/* AI Reminder Section */}
            <div className="mt-4 flex gap-2">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="default"
        onClick={handleAiReminder}
        disabled={isReminderLoading}>
        {isReminderLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {isReminderLoading ? "Setting reminder..." : "Set AI Reminder"}
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="default"
        onClick={fetchAndSyncBookmarks}
        disabled={isSyncLoading}>
        {isSyncLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcwDot className="h-4 w-4" />
        )}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {isSyncLoading ? "Syncing..." : "Sync Bookmarks"}
    </TooltipContent>
  </Tooltip>
</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                Welcome to NudgeMark, Not Logged In
              </h2>
              <p className="text-sm text-muted-foreground">
                Please sign in to continue
              </p>
            </div>
            <Button
              className="w-full"
              variant="default"
              onClick={() => handleSignIn()}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default IndexPopup
