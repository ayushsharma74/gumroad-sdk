import type { GumroadClient } from "../client.js";
import type { Subscriber, SubscriberListParams } from "../types/subscriber.js";
export declare class SubscribersResource {
    private client;
    constructor(client: GumroadClient);
    list(params: SubscriberListParams): Promise<Subscriber[]>;
    get(subscriberId: string): Promise<Subscriber>;
}
//# sourceMappingURL=subscribers.d.ts.map