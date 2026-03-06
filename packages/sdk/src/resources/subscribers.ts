import type { GumroadClient } from "../client.js";
import type { Subscriber, SubscriberListParams } from "../types/subscriber.js";

export class SubscribersResource {
    constructor(private client: GumroadClient) { }

    async list(params: SubscriberListParams): Promise<Subscriber[]> {
        const data = await this.client.request<{ success: boolean; subscribers: Subscriber[] }>(
            "GET",
            `/products/${params.product_id}/subscribers`,
            params.email ? { email: params.email } : undefined,
        );
        return data.subscribers;
    }

    async get(subscriberId: string): Promise<Subscriber> {
        const data = await this.client.request<{ success: boolean; subscriber: Subscriber }>(
            "GET",
            `/subscribers/${subscriberId}`,
        );
        return data.subscriber;
    }
}
