"use client";

import Script from "next/script";
import { Input } from "./input";
import { Button } from "./button";

export default function Waitlist() {
  return (
    <div className="min-h-[300px] w-full bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 p-6 flex items-center justify-center rounded">
      <Script src="https://getlaunchlist.com/js/widget-diy.js" defer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Join the waitlist
          </h2>
          <p className="mt-3 text-muted-foreground">
            Be the first to know when we launch. Get early access to our
            platform.
          </p>
        </div>

        <form
          className="launchlist-form mt-8 space-y-4"
          action="https://getlaunchlist.com/s/f5kZlI"
          method="POST"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary"
              />
            </div>
          </div>

          <Button
            variant="default"
            className="bg-gradient-to-r from-[#D247BF] to-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            type="submit"
          >
            <span className="">Join Waitlist</span>
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
