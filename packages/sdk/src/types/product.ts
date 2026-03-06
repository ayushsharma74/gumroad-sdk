export interface Variant {
    title: string;
    options: VariantOption[];
}

export interface VariantOption {
    name: string;
    price_difference: number;
    is_pay_what_you_want: boolean;
    recurrence_prices: Record<string, number> | null;
    url: string | null;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    short_url: string;
    thumbnail_url: string | null;
    tags: string[];
    formatted_price: string;
    published: boolean;
    url: string | null;
    sales_count: number;
    sales_usd_cents: number;
    is_tiered_membership: boolean;
    recurrences: string[] | null;
    variants: Variant[];
    preview_url: string | null;
    customizable_price: boolean;
    require_shipping: boolean;
    custom_receipt: string | null;
    custom_permalink: string | null;
    subscription_duration: string | null;
    custom_fields: string[];
    custom_summary: string | null;
    max_purchase_count: number | null;
}

export interface CreateProductInput {
    name: string;
    price: number;
    description?: string;
    url?: string;
    preview_url?: string;
    published?: boolean;
    customizable_price?: boolean;
    require_shipping?: boolean;
    custom_receipt?: string;
    custom_permalink?: string;
    subscription_duration?: string;
    custom_fields?: string[];
    custom_summary?: string;
    max_purchase_count?: number;
}

export interface UpdateProductInput {
    name?: string;
    price?: number;
    description?: string;
    url?: string;
    preview_url?: string;
    published?: boolean;
    customizable_price?: boolean;
    require_shipping?: boolean;
    custom_receipt?: string;
    custom_permalink?: string;
    subscription_duration?: string;
    custom_fields?: string[];
    custom_summary?: string;
    max_purchase_count?: number;
}
