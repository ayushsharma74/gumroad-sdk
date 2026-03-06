export class SubscribersResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const data = await this.client.request("GET", `/products/${params.product_id}/subscribers`, params.email ? { email: params.email } : undefined);
        return data.subscribers;
    }
    async get(subscriberId) {
        const data = await this.client.request("GET", `/subscribers/${subscriberId}`);
        return data.subscriber;
    }
}
//# sourceMappingURL=subscribers.js.map