export interface Sale {
    id: string;
    email: string;
    seller_id: string;
    timestamp: string;
    daystamp: string;
    created_at: string;
    product_name: string;
    product_has_variants: boolean;
    price: number;
    gumroad_fee: number;
    formatted_display_price: string;
    formatted_total_price: string;
    currency_symbol: string;
    amount_refundable_in_currency: string;
    product_id: string;
    product_permalink: string;
    partially_refunded: boolean;
    chargedback: boolean;
    purchase_email: string;
    full_name: string;
    paid: boolean;
    has_custom_fields: boolean;
    custom_fields: Record<string, string>;
    order_id: number;
    is_product_physical: boolean;
    referrer: string;
    card: CardInfo;
    product_rating: number | null;
    reviews_count: number;
    average_rating: number;
    subscription_id: string | null;
    cancelled: boolean;
    ended: boolean;
    recurring_charge: boolean;
    license_key: string | null;
    ip_country: string;
    is_gift_receiver_purchase: boolean;
    refunded: boolean;
    discover_fee_charged: boolean;
    is_recommended_purchase: boolean;
    is_gumroad_discover_sale: boolean;
    can_contact: boolean;
    offer_code: string | null;
    quantity: number;
    variants: string;
    shipping_information: ShippingInfo | null;
}

export interface CardInfo {
    visual: string | null;
    type: string | null;
    bin: string | null;
    expiry_month: number | null;
    expiry_year: number | null;
}

export interface ShippingInfo {
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

export interface SaleListParams {
    product_id?: string;
    after?: string;
    before?: string;
    email?: string;
    page_key?: string;
}
