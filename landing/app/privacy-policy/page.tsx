import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        {/* Table of Contents - Fixed on Desktop */}
        <Card className="p-4 h-fit sticky top-4 hidden lg:block">
          <h2 className="font-semibold mb-4">Table of Contents</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-2">
              <a href="#consent" className="block text-sm hover:underline">
                Consent
              </a>
              <a
                href="#information-collection"
                className="block text-sm hover:underline"
              >
                Information We Collect
              </a>
              <a
                href="#information-usage"
                className="block text-sm hover:underline"
              >
                How We Use Your Information
              </a>
              <a href="#log-files" className="block text-sm hover:underline">
                Log Files
              </a>
              <a href="#cookies" className="block text-sm hover:underline">
                Cookies and Web Beacons
              </a>
              <a href="#advertising" className="block text-sm hover:underline">
                Advertising Partners Privacy Policies
              </a>
              <a href="#third-party" className="block text-sm hover:underline">
                Third Party Privacy Policies
              </a>
              <a href="#ccpa" className="block text-sm hover:underline">
                CCPA Privacy Rights
              </a>
              <a href="#gdpr" className="block text-sm hover:underline">
                GDPR Data Protection Rights
              </a>
              <a href="#children" className="block text-sm hover:underline">
                Children&apos;s Information
              </a>
            </nav>
          </ScrollArea>
        </Card>

        {/* Main Content */}
        <div className="space-y-8 max-w-3xl">
          <div>
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-4">
              Our Privacy Policy was last updated on 02/02/2025.
            </p>
            <p className="mb-4">
              At NudgeMark, one of our main priorities is the privacy of our
              visitors. This Privacy Policy document contains types of information
              that is collected and recorded by NudgeMark and how we use it.
            </p>
            <p className="mb-4">
              If you have additional questions or require more information about our
              Privacy Policy, do not hesitate to contact us at{" "}
              <Link
                href="mailto:contact@nudgemark.com"
                className="text-primary hover:underline"
              >
                contact@nudgemark.com
              </Link>
              .
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is valid
              for visitors to our website with regards to the information that they
              shared and/or collected on https://nudgemark.com/. This policy is not
              applicable to any information collected offline or via channels other
              than this website.
            </p>
          </div>

          <section id="consent">
            <h2 className="text-2xl font-semibold mb-4">Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>
          </section>

          <section id="information-collection">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <p>
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to you
                at the point we ask you to provide your personal information.
              </p>
              <p>
                If you contact us directly, we may receive additional information
                about you such as your name, email address, phone number, the
                contents of the message and/or attachments you may send us, and any
                other information you may choose to provide.
              </p>
              <p>
                When you register for an account, we may ask for your contact
                information, including items such as name, company name, address,
                email address, and telephone number.
              </p>
            </div>
          </section>

          <section id="information-usage">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>
                Communicate with you for customer service, updates, and marketing
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </section>

          <section id="log-files">
            <h2 className="text-2xl font-semibold mb-4">Log Files</h2>
            <p className="mb-4">
              NudgeMark follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies do
              this as part of hosting services&apos; analytics.
            </p>
            <p>
              The information collected by log files includes internet protocol
              (IP) addresses, browser type, Internet Service Provider (ISP), date
              and time stamp, referring/exit pages, and possibly the number of
              clicks. These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing trends,
              administering the site, tracking users&apos; movement on the website,
              and gathering demographic information.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-2xl font-semibold mb-4">
              Cookies and Web Beacons
            </h2>
            <p className="mb-4">
              Like any other website, NudgeMark uses &apos;cookies&apos;. These
              cookies are used to store information including visitors&apos;
              preferences, and the pages on the website that the visitor accessed
              or visited.
            </p>
            <p>
              The information is used to optimize the users&apos; experience by
              customizing our web page content based on visitors&apos; browser type
              and/or other information.
            </p>
          </section>

          <section id="advertising">
            <h2 className="text-2xl font-semibold mb-4">
              Advertising Partners Privacy Policies
            </h2>
            <p className="mb-4">
              Third-party ad servers or ad networks use technologies like cookies,
              JavaScript, or Web Beacons that are used in their respective
              advertisements and links that appear on NudgeMark, which are sent
              directly to users&apos; browsers. They automatically receive your IP
              address when this occurs. These technologies are used to measure the
              effectiveness of their advertising campaigns and/or to personalize
              the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that NudgeMark has no access to or control over these cookies
              that are used by third-party advertisers.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-2xl font-semibold mb-4">
              Third Party Privacy Policies
            </h2>
            <p className="mb-4">
              NudgeMark&apos;s Privacy Policy does not apply to other advertisers
              or websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers&apos;
              respective websites.
            </p>
          </section>

          <section id="ccpa">
            <h2 className="text-2xl font-semibold mb-4">
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p className="mb-4">
              Under the CCPA, among other rights, California consumers have the
              right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Request that a business that collects a consumer&apos;s personal
                data disclose the categories and specific pieces of personal data
                that a business has collected about consumers.
              </li>
              <li>
                Request that a business delete any personal data about the consumer
                that a business has collected.
              </li>
              <li>
                Request that a business that sells a consumer&apos;s personal data,
                not sell the consumer&apos;s personal data.
              </li>
            </ul>
            <p className="mt-4">
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </section>

          <section id="gdpr">
            <h2 className="text-2xl font-semibold mb-4">
              GDPR Data Protection Rights
            </h2>
            <p className="mb-4">
              We want to ensure you are fully aware of all of your data protection
              rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The right to access: You have the right to request copies of your
                personal data. We may charge you a small fee for this service.
              </li>
              <li>
                The right to rectification: You have the right to request that we
                correct any information you believe is inaccurate. You also have
                the right to request that we complete the information you believe
                is incomplete.
              </li>
              <li>
                The right to erasure: You have the right to request that we erase
                your personal data, under certain conditions.
              </li>
              <li>
                The right to restrict processing: You have the right to request
                that we restrict the processing of your personal data, under
                certain conditions.
              </li>
              <li>
                The right to object to processing: You have the right to object to
                our processing of your personal data, under certain conditions.
              </li>
              <li>
                The right to data portability: You have the right to request that
                we transfer the data that we have collected to another
                organization, or directly to you, under certain conditions.
              </li>
            </ul>
            <p className="mt-4">
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </section>

          <section id="children">
            <h2 className="text-2xl font-semibold mb-4">
              Children&apos;s Information
            </h2>
            <p className="mb-4">
              Another part of our priority is adding protection for children while
              using the internet. We encourage parents and guardians to observe,
              participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              NudgeMark does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that your
              child provided this kind of information on our website, we strongly
              encourage you to contact us immediately and we will do our best
              efforts to promptly remove such information from our records.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
