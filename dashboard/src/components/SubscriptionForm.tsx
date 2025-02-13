
'use client';

import { useState } from 'react';

interface BillingDetails {
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: number;
}

interface SubscriptionFormProps {
  productId: string;
  customerId: string;
}

export default function SubscriptionForm({
  productId,
  customerId,
}: SubscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    city: '',
    country: 'IN',
    state: '',
    street: '',
    zipcode: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          customerId,
          billingDetails,
        }),
      });

      const { subscription } = await response.json();

      if (subscription.payment_link) {
        // Redirect to the payment link
        window.location.href = subscription.payment_link;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Street</label>
        <input
          type="text"
          value={billingDetails.street}
          onChange={(e) =>
            setBillingDetails({ ...billingDetails, street: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      {/* Add other billing fields similarly */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </form>
  );
}
