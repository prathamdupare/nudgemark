import { getLoggedInUser } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    // Fetch the logged-in user
    const user = await getLoggedInUser();

    // If no user is found, return an authentication error
    if (!user) {
      return NextResponse.json(
        { error: "User is not authenticated." },
        { status: 401 },
      );
    }

    // Parse the incoming request JSON to get bookmarks and preferences
    const { bookmarks, preferences } = await req.json();

    // Validate required fields: bookmarks and preferences
    if (!bookmarks || !preferences) {
      return NextResponse.json(
        { error: "Missing required fields: bookmarks or preferences." },
        { status: 400 },
      );
    }

    // Initialize Groq with your API key
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Make the request to Groq to get AI-generated recommendations based on the bookmarks and preferences
    const aiResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Given the following preferences: ${JSON.stringify(preferences)}, recommend a bookmark from the following list: ${JSON.stringify(bookmarks)} you must return the json only`,
        },
      ],
      model: "llama-3.3-70b-versatile", // Specify the model you want to use
    });

    // Return the AI-generated bookmark reminder
    console.log(aiResponse.choices[0].message.content);
    return NextResponse.json({ reminder: aiResponse.choices[0].message.content }, { status: 200 });
  } catch (error) {
    // Log the error and send a response with status 500
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Failed to process the bookmark reminder." },
      { status: 500 },
    );
  }
}
