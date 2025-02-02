import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";

export const metadata = {
  title: "NudgeMark",
  description:
    "AI-powered reminders to never miss your bookmarks and watch-later items.",
  openGraph: {
    type: "website",
    url: "https://www.nudgemark.com",
    title: "NudgeMark - Your Personalized Reminder Assistant",
    description:
      "NudgeMark helps you stay on top of your bookmarks and watch-later items with AI-driven reminders.",
    images: [
      {
        url: "https://your-image-url.com/og-image.jpg", // Replace with your own image URL
        width: 1200,
        height: 630,
        alt: "NudgeMark - Your Personalized Reminder Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.nudgemark.com",
    title: "NudgeMark - Your Personalized Reminder Assistant",
    description:
      "NudgeMark sends you AI-powered reminders for bookmarks and watch-later items.",
    images: [
      "https://your-image-url.com/og-image.jpg", // Replace with your own image URL
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/*<SponsorsSection />  */}
      <BenefitsSection />
      {/* <FeaturesSection /> */}
      {/*<ServicesSection /> */}
      {/*  <TestimonialSection /> */}
      <TeamSection />
      {/* <CommunitySection /> */}
      {/*   <PricingSection /> */}
      {/*<ContactSection /> */}
      <FAQSection />
    </>
  );
}
