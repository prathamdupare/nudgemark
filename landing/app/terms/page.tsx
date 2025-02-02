
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        {/* Table of Contents - Fixed on Desktop */}
        <Card className="p-4 h-fit sticky top-4 hidden lg:block">
          <h2 className="font-semibold mb-4">Table of Contents</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-2">
              <a href="#acknowledgment" className="block text-sm hover:underline">
                Acknowledgment
              </a>
              <a href="#user-accounts" className="block text-sm hover:underline">
                User Accounts
              </a>
              <a href="#copyright" className="block text-sm hover:underline">
                Copyright Policy
              </a>
              <a href="#intellectual-property" className="block text-sm hover:underline">
                Intellectual Property
              </a>
              <a href="#feedback" className="block text-sm hover:underline">
                Your Feedback to Us
              </a>
              <a href="#links" className="block text-sm hover:underline">
                Links to Other Websites
              </a>
              <a href="#termination" className="block text-sm hover:underline">
                Termination
              </a>
              <a href="#liability" className="block text-sm hover:underline">
                Limitation of Liability
              </a>
              <a href="#disclaimer" className="block text-sm hover:underline">
                AS IS Disclaimer
              </a>
              <a href="#governing-law" className="block text-sm hover:underline">
                Governing Law
              </a>
              <a href="#disputes" className="block text-sm hover:underline">
                Disputes Resolution
              </a>
              <a href="#changes" className="block text-sm hover:underline">
                Changes to Terms
              </a>
              <a href="#contact" className="block text-sm hover:underline">
                Contact Us
              </a>
            </nav>
          </ScrollArea>
        </Card>

        {/* Main Content */}
        <div className="space-y-8 max-w-3xl">
          <div>
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-muted-foreground mb-4">Our Terms and Conditions were last updated on 02/02/2025.</p>
            <p className="mb-4">Please read these terms and conditions carefully before using Our Service.</p>
          </div>

          <section id="acknowledgment">
            <h2 className="text-2xl font-semibold mb-4">Acknowledgment</h2>
            <div className="space-y-4">
              <p>
                These are the Terms and Conditions governing the use of this Service and the agreement that operates
                between you and the Company. These Terms and Conditions set out the rights and obligations of all users
                regarding the use of the Service.
              </p>
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these
                Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or
                use the Service.
              </p>
              <p>
                By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree
                with any part of these Terms and Conditions, then you may not access the Service.
              </p>
              <p>
                Your access to and use of the Service is also conditioned on your acceptance of and compliance with the
                Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the
                collection, use, and disclosure of your personal information when you use the Application or the Website
                and tells you about your privacy rights and how the law protects you. Please read Our Privacy Policy
                carefully before using Our Service.
              </p>
            </div>
          </section>

          <section id="user-accounts">
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <div className="space-y-4">
              <p>
                When you create an account with us, you must provide us with information that is accurate, complete, and
                current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
                termination of your account.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password, whether your password is with Our Service or a Third-Party
                Social Media Service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming
                aware of any breach of security or unauthorized use of your account.
              </p>
              <p>
                You may not use as a username the name of another person or entity that is not lawfully available for
                use, a name or trademark that is subject to any rights of another person or entity other than you
                without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene.
              </p>
            </div>
          </section>

          <section id="copyright">
            <h2 className="text-2xl font-semibold mb-4">Copyright Policy</h2>
            <h3 className="text-xl font-medium mb-3">Intellectual Property Infringement</h3>
            <p className="mb-4">
              All content, features, and functionality of our services, including but not limited to text, graphics,
              logos, and software, are the exclusive property of NudgeMark and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium mb-3">DMCA Notice and Procedure for Copyright Infringement Claims</h3>
            <p className="mb-4">
              You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our
              Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                An electronic or physical signature of the person authorized to act on behalf of the owner of the
                copyright's interest.
              </li>
              <li>
                A description of the copyrighted work that You claim has been infringed, including the URL of the
                location where the copyrighted work exists or a copy of the copyrighted work.
              </li>
              <li>
                Identification of the URL or other specific location on the Service where the material that You claim is
                infringing is located.
              </li>
              <li>Your address, telephone number, and email address.</li>
              <li>
                A statement by You that You have a good faith belief that the disputed use is not authorized by the
                copyright owner, its agent, or the law.
              </li>
              <li>
                A statement by You, made under penalty of perjury, that the above information in Your notice is accurate
                and that You are the copyright owner or authorized to act on the copyright owner's behalf.
              </li>
            </ul>
            <p className="mt-4">
              You can contact our copyright agent via email at{" "}
              <Link href="mailto:copyright@nudgemark.com" className="text-primary hover:underline">
                copyright@nudgemark.com
              </Link>
            </p>
          </section>

          <section id="intellectual-property">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <p>
                The Service and its original content (excluding Content provided by you or other users), features, and
                functionality are and will remain the exclusive property of the Company and its licensors.
              </p>
              <p>
                The Service is protected by copyright, trademark, and other laws of both the Country and foreign
                countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the
                prior written consent of the Company.
              </p>
            </div>
          </section>

          <section id="feedback">
            <h2 className="text-2xl font-semibold mb-4">Your Feedback to Us</h2>
            <p>
              You assign all rights, title, and interest in any Feedback You provide to the Company. If for any reason
              such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable,
              royalty-free, worldwide right, and license to use, reproduce, disclose, sublicense, distribute, modify,
              and exploit such Feedback without restriction.
            </p>
          </section>

          <section id="links">
            <h2 className="text-2xl font-semibold mb-4">Links to Other Websites</h2>
            <div className="space-y-4">
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by
                the Company.
              </p>
              <p>
                The Company has no control over, and assumes no responsibility for, the content, privacy policies, or
                practices of any third-party websites or services. You further acknowledge and agree that the Company
                shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to
                be caused by or in connection with the use of or reliance on any such content, goods, or services
                available on or through any such websites or services.
              </p>
              <p>
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites
                or services that you visit.
              </p>
            </div>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <div className="space-y-4">
              <p>
                We may terminate or suspend your Account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach these Terms and Conditions.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately. If you wish to terminate your
                Account, you may simply discontinue using the Service.
              </p>
            </div>
          </section>

          <section id="liability">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              Notwithstanding any damages that you might incur, the entire liability of the Company and any of its
              suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be
              limited to the amount actually paid by you through the Service or 100 USD if you haven't purchased
              anything through the Service.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="text-2xl font-semibold mb-4">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
            <div className="space-y-4">
              <p>
                The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without
                warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own
                behalf and on behalf of its Affiliates and its and their respective licensors and service providers,
                expressly disclaims all warranties, whether express, implied, statutory or otherwise.
              </p>
              <p>
                Without limiting the foregoing, neither the Company nor any of the company's provider makes any
                representation or warranty of any kind, express or implied: (i) as to the operation or availability of
                the Service, or the information, content, and materials or products included thereon; (ii) that the
                Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any
                information or content provided through the Service; or (iv) that the Service, its servers, the content,
                or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms,
                malware, timebombs or other harmful components.
              </p>
            </div>
          </section>

          <section id="governing-law">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p>
              The laws of India, excluding its conflicts of law rules, shall govern these Terms and your use of the
              Service. Your use of the Application may also be subject to other local, state, national, or international
              laws.
            </p>
          </section>

          <section id="disputes">
            <h2 className="text-2xl font-semibold mb-4">Disputes Resolution</h2>
            <p>
              If You have any concern or dispute about the Service, You agree to first try to resolve the dispute
              informally by contacting the Company.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms and Conditions</h2>
            <div className="space-y-4">
              <p>
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will make reasonable efforts to provide at least 30 days' notice before any new
                terms take effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound
                by the revised terms.
              </p>
            </div>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, You can contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                By visiting our website:{" "}
                <Link href="https://nudgemark.com" className="text-primary hover:underline">
                  https://nudgemark.com
                </Link>
              </li>
              <li>
                By sending us an email:{" "}
                <Link href="mailto:contact@nudgemark.com" className="text-primary hover:underline">
                  contact@nudgemark.com
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

