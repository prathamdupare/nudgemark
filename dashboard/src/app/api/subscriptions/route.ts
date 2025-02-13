// app/api/subscriptions/route.ts
import { dodoClient } from "@/lib/dodo-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, customerId, billing } = await request.json();

    // Debug logs
    console.log(
      "API Key:",
      process.env.DODO_PAYMENTS_API_KEY?.substring(0, 5) + "...",
    );
    console.log("Request body:", { productId, customerId, billing });

    const subscription = await dodoClient.subscriptions.create({
      billing: billing,
      customer: { customer_id: customerId },
      product_id: productId,
      payment_link: true,
      return_url: "http://localhost:3000/subscription/success",
      quantity: 1,
    });

    // Debug log
    console.log("Subscription response:", subscription);

    return NextResponse.json(subscription);
  } catch (error: unknown) {
    // Proper error handling
    console.error("Error creating Subscriptions", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Error creating Subscriptions" },
      { status: 500 },
    );
  }
}
