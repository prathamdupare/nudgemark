import { getLoggedInUser } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Client, Databases, Query } from "node-appwrite";

export async function GET() {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 },
      );
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);

    const bookmarks = await databases.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_APPWRITE_BOOKMARKS_COLLECTION_ID!,
      [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")],
    );

    return NextResponse.json(
      {
        bookmarks: bookmarks.documents,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks." },
      { status: 500 },
    );
  }
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

    const { bookmarks, preferences } = await req.json();

    if (!bookmarks || !preferences) {
      return NextResponse.json(
        { error: "Missing required fields: bookmarks or preferences." },
        { status: 400 },
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const aiResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Given the following preferences: ${JSON.stringify(preferences)}, recommend a bookmark from the following list: ${JSON.stringify(bookmarks)} you must return the json only`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    console.log(aiResponse.choices[0].message.content);
    return NextResponse.json(
      { reminder: aiResponse.choices[0].message.content },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Failed to process the bookmark reminder." },
      { status: 500 },
    );
  }
}
