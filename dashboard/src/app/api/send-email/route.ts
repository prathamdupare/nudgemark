// app/api/send-email/route.ts
import { LoopsClient } from "loops";
import { NextResponse } from "next/server";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    // Log the request data for debugging
    console.log("Sending email with:", { email, subject, message });

    const response = await loops.sendTransactionalEmail({
      transactionalId: "cm6xgkkm102ywgeq7c5r2dba6", // Your template ID
      email: email,
      dataVariables: {
        subject: subject,
        message: message,
      },
    });

    console.log("Loops response:", response);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Proper error handling
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
