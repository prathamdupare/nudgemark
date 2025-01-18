// src/app/api/auth/check/route.ts
import { getLoggedInUser } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getLoggedInUser();
    if (user) {
      return NextResponse.json(
        {
          isAuthenticated: true,
          user: {
            name: user.name,
            email: user.email,
          },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );
    }
    return NextResponse.json({ isAuthenticated: false });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false });
  }
}
