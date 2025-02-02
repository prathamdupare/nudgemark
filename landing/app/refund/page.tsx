
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Mail, Ban, CheckCircle } from "lucide-react"

export default function RefundPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        {/* Table of Contents - Fixed on Desktop */}
        <Card className="p-4 h-fit sticky top-4 hidden lg:block">
          <h2 className="font-semibold mb-4">Table of Contents</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-2">
              <a href="#eligibility" className="block text-sm hover:underline">
                Eligibility for Refunds
              </a>
              <a href="#refund-period" className="block text-sm hover:underline">
                Refund Period
              </a>
              <a href="#non-refundable" className="block text-sm hover:underline">
                Non-Refundable Cases
              </a>
              <a href="#process" className="block text-sm hover:underline">
                Refund Process
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
            <h1 className="text-4xl font-bold mb-6">Return & Refund Policy</h1>
            <p className="text-muted-foreground mb-4">Our Return and Refund Policy was last updated on 02/02/2025.</p>
            <p className="mb-4">Thank you for shopping at NudgeMark.</p>
            <p>The following terms are applicable for any products that you have purchased from us.</p>
          </div>

          <section id="eligibility">
            <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
            <p className="mb-4">We offer refunds under the following circumstances:</p>
            <div className="grid gap-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  If the service is not delivered as promised due to an error on our end.
                </AlertDescription>
              </Alert>
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  If a technical issue caused by our platform prevents you from accessing the features you paid for, and
                  the issue cannot be resolved within a reasonable timeframe.
                </AlertDescription>
              </Alert>
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  If you cancel your subscription within the refund period outlined below.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <section id="refund-period">
            <h2 className="text-2xl font-semibold mb-4">Refund Period</h2>
            <Alert className="border-blue-200 bg-blue-50">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                Refund requests must be made within <strong>10 days</strong> of the payment date. Requests made after
                this period will not be eligible for a refund.
              </AlertDescription>
            </Alert>
          </section>

          <section id="non-refundable">
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Cases</h2>
            <p className="mb-4">Refunds will not be granted under the following conditions:</p>
            <div className="grid gap-4">
              <Alert className="border-red-200 bg-red-50">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription>If you change your mind after purchasing a subscription or service.</AlertDescription>
              </Alert>
              <Alert className="border-red-200 bg-red-50">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription>If you fail to use the service during the subscription period.</AlertDescription>
              </Alert>
              <Alert className="border-red-200 bg-red-50">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  If the issue is caused by third-party software or tools not affiliated with our platform.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <section id="process">
            <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
            <div className="space-y-4">
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Contact our support team at{" "}
                  <Link href="mailto:contact@nudgemark.com" className="text-primary hover:underline">
                    contact@nudgemark.com
                  </Link>
                </li>
                <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
                <li>Our team will review your request and respond within 3-5 business days.</li>
                <li>
                  If your request is approved, the refund will be processed to your original payment method within 7-10
                  business days.
                </li>
              </ol>
            </div>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Refund Policy or require assistance, please reach out to us:
            </p>
            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <Link href="mailto:contact@nudgemark.com" className="text-primary hover:underline">
                  contact@nudgemark.com
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

