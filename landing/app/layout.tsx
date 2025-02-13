import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { FooterSection } from "@/components/layout/sections/footer";
import PlausibleProvider from "next-plausible";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NudgeMark",
  description:
    "AI-powered reminders to never miss your bookmarks and watch-later items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <Head>
        <script
          defer
          data-domain="nudgemark.com"
          src="https://analytics.fosspage.tech/js/script.js"
        ></script>
      </Head>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <PlausibleProvider
          domain="nudgemark.com"
          selfHosted
          customDomain="https://analytics.fosspage.tech/js/script.hash.outbound-links.pageview-props.tagged-events.js"
          taggedEvents
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {children}

            <FooterSection />
            <Toaster />
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
