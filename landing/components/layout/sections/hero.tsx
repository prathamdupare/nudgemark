import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Waitlist from "@/components/ui/waitlist";

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-12 md:py-12">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> Smarter bookmark management with AI </span>
          </Badge>

          <div className="max-w-screen-lg mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Organize and remember with
              <br />
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text block">
                AI-powered BookMark reminders
              </span>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`NudgeMark helps you never miss your important bookmarks and watch-later items with AI-powered reminders. Stay organized effortlessly!`}
          </p>

          <Button
            disabled
            className="bg-gradient-to-r from-[#D247BF] to-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
          >
            Download Extension{" "}
            <span className="text-xs ml-2">(Coming soon!)</span>
          </Button>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {/*


            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git" // Change this to your GitHub repository URL
                target="_blank"
              >
                Github Repository
              </Link>
            </Button>

           */}
          </div>
          <div className="flex items-center justify-center">
            <Waitlist />
          </div>
        </div>

        {/*
        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/hero-image-dark.jpeg"
                : "/hero-image-dark.jpeg"
            }
            alt="NudgeMark dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>


           */}
      </div>
    </section>
  );
};
