"use client";

import { getLoggedInUser } from "@/lib/server/appwrite";
import { useState } from "react";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await getLoggedInUser();

      if (!user) {
        setError("User is not authenticated.");
        return;
      }

      // Get or create payment info
      const paymentInfoResponse = await fetch("/api/payment-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.$id,
          email: user.email,
          name: user.name,
        }),
      });

      if (!paymentInfoResponse.ok) {
        throw new Error("Failed to process payment info");
      }

      const { dodoCustomerId } = await paymentInfoResponse.json();

      // Create subscription
      const subscriptionResponse = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "pdt_t2eHbNYjWDPIoux7p1nPB",
          customerId: dodoCustomerId,
          billing: {
            city: "Test City",
            country: "IN",
            state: "Test State",
            street: "Test Street",
            zipcode: "400001",
          },
        }),
      });

      if (!subscriptionResponse.ok) {
        const errorData = await subscriptionResponse.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      const subscriptionData = await subscriptionResponse.json();

      // Redirect to payment
      if (subscriptionData.payment_link) {
        window.location.href = subscriptionData.payment_link;
      } else {
        throw new Error("No payment link received");
      }
    } catch (error: unknown) {
      // Proper error handling
      console.error("Error sending bookmark reminder:", error);
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
        <p className="text-gray-600 mb-6">Get access to all features</p>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>
        {error && (
          <div className="mt-2 text-red-500 text-sm">Error: {error}</div>
        )}
      </div>
    </div>
  );
}
