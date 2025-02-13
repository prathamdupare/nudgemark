import { Client, Databases, ID, Query, Models } from "node-appwrite";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

interface ChromeBookmark {
  id: string;
  index: number;
  title: string;
  parentId: string;
  url?: string;
  dateAdded?: number;
}

interface BookmarkDocument extends Models.Document {
  userId: string;
  title: string;
  url: string;
  index: number;
  dateAdded: string;
  lastSync: string;
}

interface SyncResponse {
  message: string;
  totalProcessed: number;
  created: number;
  updated: number;
  bookmarks: BookmarkDocument[];
}

export async function POST(req: Request) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 },
      );
    }

    const { bookmarks }: { bookmarks: ChromeBookmark[] } = await req.json();

    if (!bookmarks || !Array.isArray(bookmarks)) {
      return NextResponse.json(
        { error: "Invalid bookmarks data format." },
        { status: 400 },
      );
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);

    // Process bookmarks with URL only
    const validBookmarks = bookmarks.filter(
      (bookmark): bookmark is ChromeBookmark & { url: string } =>
        bookmark.url !== undefined,
    );

    const results = await Promise.all(
      validBookmarks.map(async (bookmark) => {
        try {
          // Check if bookmark already exists
          const existingBookmarks =
            await databases.listDocuments<BookmarkDocument>(
              process.env.NEXT_APPWRITE_DATABASE_ID!,
              process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
              [
                Query.equal("userId", user.$id),
                Query.equal("url", bookmark.url),
              ],
            );

          const documentData = {
            userId: user.$id,
            title: bookmark.title || "",
            url: bookmark.url,
            index: bookmark.index,
            dateAdded: bookmark.dateAdded
              ? new Date(bookmark.dateAdded).toISOString()
              : new Date().toISOString(),
            lastSync: new Date().toISOString(),
          };

          if (existingBookmarks.documents.length > 0) {
            // Update existing bookmark
            const existingBookmark = existingBookmarks.documents[0];
            return await databases.updateDocument<BookmarkDocument>(
              process.env.NEXT_APPWRITE_DATABASE_ID!,
              process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
              existingBookmark.$id,
              documentData,
            );
          } else {
            // Create new bookmark
            return await databases.createDocument<BookmarkDocument>(
              process.env.NEXT_APPWRITE_DATABASE_ID!,
              process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
              ID.unique(),
              documentData,
            );
          }
        } catch (error) {
          console.error(`Error processing bookmark ${bookmark.title}:`, error);
          return null;
        }
      }),
    );

    const successfulResults = results.filter(
      (result): result is BookmarkDocument => result !== null,
    );
    const updatedCount = successfulResults.filter(
      (result) => result.$updatedAt !== result.$createdAt,
    ).length;
    const createdCount = successfulResults.length - updatedCount;

    const response: SyncResponse = {
      message: "Bookmarks synced successfully",
      totalProcessed: successfulResults.length,
      created: createdCount,
      updated: updatedCount,
      bookmarks: successfulResults,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error syncing bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to sync bookmarks." },
      { status: 500 },
    );
  }
}
