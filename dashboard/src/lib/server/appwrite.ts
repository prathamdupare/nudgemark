// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const cookiesInstance = await cookies();
    const session = cookiesInstance.get("nudgemark-session");

    if (!session || !session.value) {
      return null;
    }

    client.setSession(session.value);

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.error("Error creating session client:", error);
    return null;
  }
}

export async function createAdminClient() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
      .setKey(process.env.NEXT_APPWRITE_KEY as string);

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.error("Error creating admin client:", error);
    return null;
  }
}

export async function getLoggedInUser() {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return null;
    }
    return await sessionClient.account.get();
  } catch (error) {
    console.error("Error getting logged in user:", error);
    return null;
  }
}
