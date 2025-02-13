export const createStaticPaymentLink = ({
  productId,
  quantity = 1,
  returnUrl,
  customerInfo = {},
}: {
  productId: string;
  quantity?: number;
  returnUrl: string;
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    country?: string;
    addressLine?: string;
    city?: string;
    zipCode?: string;
    state?: string;
  };
}) => {
  const baseUrl = "https://test.checkout.dodopayments.com/buy";
  const params = new URLSearchParams({
    quantity: quantity.toString(),
    redirect_url: returnUrl,
    ...customerInfo,
  });

  return `${baseUrl}/${productId}?${params.toString()}`;
};
