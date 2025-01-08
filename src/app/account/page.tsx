// src/app/account/page.jsx

import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  const cookiesInstance = await cookies();
  cookiesInstance.delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/signup");
}

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome, {user.name}!
          </CardTitle>
          <CardDescription>Here are your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="font-medium">Email</div>
              <div className="col-span-2 font-mono bg-muted p-2 rounded-md">
                {user.email}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="font-medium">Name</div>
              <div className="col-span-2 bg-muted p-2 rounded-md">
                {user.name}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="font-medium">ID</div>
              <div
                className="col-span-2 font-mono text-sm bg-muted p-2 rounded-md truncate"
                title={user.$id}
              >
                {user.$id}
              </div>
            </div>
          </div>

          <form action={signOut}>
            <Button type="submit" variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
