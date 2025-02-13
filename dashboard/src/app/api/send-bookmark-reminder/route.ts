// app/api/send-bookmark-reminder/route.ts
import { LoopsClient } from "loops";
import { NextResponse } from "next/server";

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function POST(request: Request) {
  try {
    const { email, bookmarks } = await request.json();

    // Send transactional email with dynamic bookmark data
    await loops.sendTransactionalEmail({
      transactionalId: "cm6xgkkm102ywgeq7c5r2dba6",
      email: email,
      dataVariables: {
        bookmarks: bookmarks,
        bookmarkCount: bookmarks.length,
        date: new Date().toLocaleDateString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error sending bookmark reminder:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
