import "../style.css"

import { Bookmark, Loader2, LogIn, LogOut, Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import type { AuthStatus } from "./background"
import NotificationSettings from "./components/NotificationSettings"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Separator } from "./components/ui/separator"

type Bookmark = chrome.bookmarks.BookmarkTreeNode

function IndexPopup() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false
  })
  const [loading, setLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [bookmarksLoading, setBookmarksLoading] = useState(true)

  const handleSignIn = () => {
    try {
//      new Notification("Trying to Sign In!", {
 //       body: "This is a notification from your browser.",
  //      icon: "https://via.placeholder.com/64" // Optional icon
   //   })
      window.open("http://localhost:3000/signup", "_blank")
    } catch (e) {
      console.log(e)
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
    <div className="w-[350px] p-6 shadow-sm">
      {authStatus.isAuthenticated ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Logged In</h2>
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
          <NotificationSettings />

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
  )
}

export default IndexPopup
