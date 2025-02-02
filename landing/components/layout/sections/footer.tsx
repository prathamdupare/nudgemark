import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link
              href="/"
              className="font-bold text-lg  p-1 rounded-lg flex items-center"
            >
              <Image
                src="/logo.png"
                width={60}
                height={60}
                alt="logo"
                className="block dark:hidden"
              />
              {/* Dark mode logo */}
              <Image
                src="/logo1.png"
                width={60}
                height={60}
                alt="logo"
                className="hidden dark:block"
              />
              NudgeMark
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link
                href="https://github.com/prathamdupare/nudgemark"
                className="opacity-60 hover:opacity-100"
              >
                Github
              </Link>
            </div>

            <div>
              <Link
                href="https://x.com/prathammdupare"
                className="opacity-60 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Platforms</h3>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Web
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Policies</h3>
            <div>
              <Link
                href="https://x.com/prathammdupare"
                className="opacity-60 hover:opacity-100"
              >
                Contact
              </Link>
            </div>

            <div>
              <Link
                href="/refund-policy"
                className="opacity-60 hover:opacity-100"
              >
                Refund Policy
              </Link>
            </div>

            <div>
              <Link href="/terms" className="opacity-60 hover:opacity-100">
                Terms
              </Link>
            </div>

            <div>
              <Link
                href="/privacy-policy"
                className="opacity-60 hover:opacity-100"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <Link
                href="https://github.com/prathamdupare/nudgemark"
                className="opacity-60 hover:opacity-100"
              >
                Github
              </Link>
            </div>

            <div>
              <Link
                href="https://x.com/prathammdupare"
                className="opacity-60 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2025 Designed and developed by
            <Link
              target="_blank"
              href="https://github.com/prathamdupare"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Pratham Dupare
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
