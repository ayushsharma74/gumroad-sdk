export interface License {
    id: string;
    product_id: string;
    user_id: string;
    user_email: string;
    license_key: string;
    uses: number;
    purchase_id: string;
    created_at: string;
    disabled: boolean;
}

export interface LicenseVerifyParams {
    product_permalink: string;
    license_key: string;
    increment_uses_count?: boolean;
}

export interface LicenseVerifyResult {
    success: boolean;
    uses: number;
    purchase: LicensePurchase;
}

export interface LicensePurchase {
    seller_id: string;
    product_id: string;
    product_name: string;
    permalink: string;
    product_permalink: string;
    email: string;
    price: number;
    gumroad_fee: number;
    currency: string;
    quantity: number;
    discover_fee_charged: boolean;
    can_contact: boolean;
    referrer: string;
    card: Record<string, unknown>;
    order_number: number;
    sale_id: string;
    sale_timestamp: string;
    purchaser_id: string;
    subscription_id: string | null;
    is_gift_receiver_purchase: boolean;
    refunded: boolean;
    disputed: boolean;
    dispute_won: boolean;
    id: string;
    created_at: string;
    custom_fields: Record<string, string>[];
    license_key: string;
    ip_country: string;
    recurrence: string | null;
    is_recurring_billing: boolean;
    can_shift_subscription: boolean;
    subscription_ended_at: string | null;
    subscription_cancelled_at: string | null;
    subscription_failed_at: string | null;
    test: boolean;
}
