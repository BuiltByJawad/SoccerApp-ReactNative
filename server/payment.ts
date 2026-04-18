import SSLCommerzPayment from "sslcommerz-lts";

const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty";
const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";

export function initPayment(data: {
  totalAmount: number;
  tranId: string;
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  productName: string;
}): Promise<string> {
  const sslcz = new SSLCommerzPayment(storeId, storePassword, isLive);

  const payload = {
    total_amount: data.totalAmount,
    currency: "BDT",
    tran_id: data.tranId,
    success_url: data.successUrl,
    fail_url: data.failUrl,
    cancel_url: data.cancelUrl,
    ipn_url: data.successUrl,
    shipping_method: "NO",
    product_name: data.productName,
    product_category: "Sports Booking",
    product_profile: "non-physical-goods",
    cus_name: data.cusName || "Customer",
    cus_email: data.cusEmail || "customer@example.com",
    cus_phone: data.cusPhone || "01700000000",
    cus_add1: "N/A",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    ship_name: data.cusName || "Customer",
    ship_add1: "N/A",
    ship_city: "Dhaka",
    ship_country: "Bangladesh",
    ship_postcode: "1200",
  };

  return sslcz.init(payload).then((apiResponse: Record<string, unknown>) => {
    if (apiResponse.status === "SUCCESS" && apiResponse.GatewayPageURL) {
      return apiResponse.GatewayPageURL as string;
    }
    throw new Error((apiResponse.failedreason as string) || "Payment init failed");
  });
}

export function validatePayment(
  tranId: string,
  amount: number,
): Promise<{ val_id: string; status: string }> {
  const sslcz = new SSLCommerzPayment(storeId, storePassword, isLive);
  return sslcz.validate({ tran_id: tranId, amount, currency: "BDT" })
    .then((res: Record<string, unknown>) => ({
      val_id: res.val_id as string,
      status: res.status as string,
    }));
}
