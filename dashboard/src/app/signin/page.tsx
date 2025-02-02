
// src/app/signin/page.tsx

import { getLoggedInUser } from "@/lib/server/appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { signUpWithGithub } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      email.toString(),
      password.toString()
    );

    const cookiesInstance = cookies();
    cookiesInstance.set("nudgemark-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });

    redirect("/account");
  } catch (error) {
    console.error("Sign in error:", error);
    throw new Error("Invalid credentials");
  }
}

export default async function SignInPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Email Sign In Form */}
          <form action={signInWithEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="email@example.com"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* GitHub Sign In Form */}
            <form action={signUpWithGithub}>
              <Button variant="outline" className="w-full" type="submit">
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
