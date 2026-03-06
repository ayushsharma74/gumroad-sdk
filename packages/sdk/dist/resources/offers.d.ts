import type { GumroadClient } from "../client.js";
import type { Offer, CreateOfferInput } from "../types/offer.js";
export declare class OffersResource {
    private client;
    constructor(client: GumroadClient);
    list(productId: string): Promise<Offer[]>;
    get(productId: string, offerId: string): Promise<Offer>;
    create(input: CreateOfferInput): Promise<Offer>;
    update(productId: string, offerId: string, input: Partial<Omit<CreateOfferInput, "product_id">>): Promise<Offer>;
    delete(productId: string, offerId: string): Promise<void>;
}
//# sourceMappingURL=offers.d.ts.map