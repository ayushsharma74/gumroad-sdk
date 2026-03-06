import type { GumroadClient } from "../client.js";
import type { Offer, CreateOfferInput } from "../types/offer.js";

export class OffersResource {
    constructor(private client: GumroadClient) { }

    async list(productId: string): Promise<Offer[]> {
        const data = await this.client.request<{ success: boolean; offers: Offer[] }>(
            "GET",
            `/products/${productId}/offer_codes`,
        );
        return data.offers;
    }

    async get(productId: string, offerId: string): Promise<Offer> {
        const data = await this.client.request<{ success: boolean; offer: Offer }>(
            "GET",
            `/products/${productId}/offer_codes/${offerId}`,
        );
        return data.offer;
    }

    async create(input: CreateOfferInput): Promise<Offer> {
        const { product_id, ...rest } = input;
        const data = await this.client.request<{ success: boolean; offer: Offer }>(
            "POST",
            `/products/${product_id}/offer_codes`,
            rest as unknown as Record<string, unknown>,
        );
        return data.offer;
    }

    async update(
        productId: string,
        offerId: string,
        input: Partial<Omit<CreateOfferInput, "product_id">>,
    ): Promise<Offer> {
        const data = await this.client.request<{ success: boolean; offer: Offer }>(
            "PUT",
            `/products/${productId}/offer_codes/${offerId}`,
            input as unknown as Record<string, unknown>,
        );
        return data.offer;
    }

    async delete(productId: string, offerId: string): Promise<void> {
        await this.client.request<{ success: boolean; message: string }>(
            "DELETE",
            `/products/${productId}/offer_codes/${offerId}`,
        );
    }
}
