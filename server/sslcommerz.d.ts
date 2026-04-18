declare module "sslcommerz-lts" {
  interface InitPayload {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url: string;
    shipping_method: string;
    product_name: string;
    product_category: string;
    product_profile: string;
    cus_name: string;
    cus_email: string;
    cus_phone: string;
    cus_add1: string;
    cus_city: string;
    cus_country: string;
    [key: string]: unknown;
  }

  interface ValidatePayload {
    tran_id: string;
    amount: number;
    currency: string;
  }

  class SSLCommerzPayment {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(payload: InitPayload): Promise<Record<string, unknown>>;
    validate(payload: ValidatePayload): Promise<Record<string, unknown>>;
  }

  export default SSLCommerzPayment;
}
