export interface Offer {
    id: string;
    name: string;
    max_purchase_count: number;
    amount_off: number;
    offer_type: "cents" | "percent";
    universal: boolean;
    product_ids: string[];
}
export interface CreateOfferInput {
    product_id: string;
    name: string;
    amount_off: number;
    offer_type?: "cents" | "percent";
    max_purchase_count?: number;
    universal?: boolean;
}
//# sourceMappingURL=offer.d.ts.map