import { dodoClient } from "@/lib/dodo-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name } = await request.json();
  try {
    // Create customer exactly as shown in docs
    const customer = await dodoClient.customers.create({
      email: email,
      name: name,
    });

    return NextResponse.json(customer);
  } catch (error: unknown) {
    // Proper error handling
    console.error("Error Creating Customer", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Error Creating Customer" },
      { status: 500 },
    );
  }
}
