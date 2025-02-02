"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Loader2 } from "lucide-react";

interface Bookmark {
  $id: string;
  title: string;
  url: string;
  dateAdded: string;
  lastSync: string;
  userId: string;
}

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/bookmarks", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      setBookmarks(data.bookmarks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookmarks");
      console.error("Error fetching bookmarks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-muted-foreground">No bookmarks found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.$id} className="flex flex-col">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <CardTitle className="text-base">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                {bookmark.title || "Untitled"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Added:{" "}
                  {new Date(bookmark.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="truncate text-xs">
                <span className="opacity-70">{bookmark.url}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                Last synced:{" "}
                {new Date(bookmark.lastSync).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
