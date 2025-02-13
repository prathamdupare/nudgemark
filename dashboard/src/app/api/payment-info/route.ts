import { NextResponse } from "next/server";
import { Client, Databases, ID, Query } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);

    const { userId, email, name } = await request.json();
    // Check for existing payment info
    const existingPaymentInfo = await databases.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_APPWRITE_PAYMENTS_COLLECTION_ID!,
      [
        Query.equal("user_id", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(1),
      ],
    );

    let dodoCustomerId;

    if (existingPaymentInfo.total === 0) {
      // Create new DodPayments customer
      const customerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name }),
        },
      );

      if (!customerResponse.ok) {
        throw new Error("Failed to create customer");
      }

      const customerData = await customerResponse.json();

      // Store customer info in Appwrite
      await databases.createDocument(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_APPWRITE_PAYMENTS_COLLECTION_ID!,
        ID.unique(),
        {
          user_id: userId,
          dodo_customer_id: customerData.customer_id,
          email,
          name,
          created_at: new Date().toISOString(),
        },
      );

      dodoCustomerId = customerData.customer_id;
    } else {
      dodoCustomerId = existingPaymentInfo.documents[0].dodo_customer_id;
    }

    return NextResponse.json({ dodoCustomerId });
  } catch (error: unknown) {
    // Proper error handling
    console.error("Error Handlisng Payment Info", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Error Handlisng Payment Info" },
      { status: 500 },
    );
  }
}
