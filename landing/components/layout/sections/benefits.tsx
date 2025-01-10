import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Bookmark",
    title: "Smart Bookmarking",
    description:
      "Save anything—web pages, articles, and videos—with just a click. Organize and access your bookmarks effortlessly.",
  },
  {
    icon: "Bell",
    title: "AI-Powered Reminders",
    description:
      "Never forget important tasks or saved items. Our AI sends timely reminders to keep you on track.",
  },
  {
    icon: "TrendingUp",
    title: "Boost Productivity",
    description:
      "Focus on what matters. Our tool helps streamline your workflow, saving time and increasing efficiency.",
  },
  {
    icon: "Clock",
    title: "Watch-Later Made Easy",
    description:
      "Bookmark videos and other content to watch later. Our reminders ensure you never miss what’s important.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            Why Choose Us?
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Your Productivity Potential
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Transform the way you work and stay organized effortlessly. With our
            AI-powered extension, you’ll never miss an important task, bookmark,
            or watch-later video again. Take control of your day and achieve
            more with less effort.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
