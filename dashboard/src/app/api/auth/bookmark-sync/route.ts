import { Client, Databases, ID, Query } from "node-appwrite";
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

export async function POST(req: Request) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const { bookmarks }: { bookmarks: ChromeBookmark[] } = await req.json();

    if (!bookmarks || !Array.isArray(bookmarks)) {
      return NextResponse.json(
        { error: "Invalid bookmarks data format." },
        { status: 400 }
      );
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);

    // Process bookmarks with URL only
    const validBookmarks = bookmarks.filter((bookmark) => bookmark.url);

    const results = await Promise.all(
      validBookmarks.map(async (bookmark) => {
        try {
          // Check if bookmark already exists
          const existingBookmarks = await databases.listDocuments(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
            [
              Query.equal("userId", user.$id),
              Query.equal("url", bookmark.url!)
            ]
          );

          const documentData = {
            userId: user.$id,
            title: bookmark.title || "",
            url: bookmark.url!,
            index: bookmark.index,
            dateAdded: bookmark.dateAdded
              ? new Date(bookmark.dateAdded).toISOString()
              : new Date().toISOString(),
            lastSync: new Date().toISOString()
          };

          if (existingBookmarks.documents.length > 0) {
            // Update existing bookmark
            const existingBookmark = existingBookmarks.documents[0];
            return await databases.updateDocument(
              process.env.NEXT_APPWRITE_DATABASE_ID!,
              process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
              existingBookmark.$id,
              documentData
            );
          } else {
            // Create new bookmark
            return await databases.createDocument(
              process.env.NEXT_APPWRITE_DATABASE_ID!,
              process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
              ID.unique(),
              documentData
            );
          }
        } catch (error: any) {
          console.error(
            `Error processing bookmark ${bookmark.title}:`,
            error.message
          );
          return null;
        }
      })
    );

    const successfulResults = results.filter((result) => result !== null);
    const updatedCount = successfulResults.filter(
      (result) => result!.$updatedAt !== result!.$createdAt
    ).length;
    const createdCount = successfulResults.length - updatedCount;

    return NextResponse.json(
      {
        message: "Bookmarks synced successfully",
        totalProcessed: successfulResults.length,
        created: createdCount,
        updated: updatedCount,
        bookmarks: successfulResults
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to sync bookmarks." },
      { status: 500 }
    );
  }
}
