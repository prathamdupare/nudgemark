// src/lib/server/oauth.js
"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();
  const headerInstance = await headers();
  const origin = headerInstance.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/signup`,
  );

  return redirect(redirectUrl);
}

export async function signUpWithGithub() {
  const { account } = await createAdminClient();
  const headerInstance = await headers();
  const origin = headerInstance.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth`,
    `${origin}/signup`,
  );

  return redirect(redirectUrl);
}
