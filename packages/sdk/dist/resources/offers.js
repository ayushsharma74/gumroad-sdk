export class OffersResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(productId) {
        const data = await this.client.request("GET", `/products/${productId}/offer_codes`);
        return data.offers;
    }
    async get(productId, offerId) {
        const data = await this.client.request("GET", `/products/${productId}/offer_codes/${offerId}`);
        return data.offer;
    }
    async create(input) {
        const { product_id, ...rest } = input;
        const data = await this.client.request("POST", `/products/${product_id}/offer_codes`, rest);
        return data.offer;
    }
    async update(productId, offerId, input) {
        const data = await this.client.request("PUT", `/products/${productId}/offer_codes/${offerId}`, input);
        return data.offer;
    }
    async delete(productId, offerId) {
        await this.client.request("DELETE", `/products/${productId}/offer_codes/${offerId}`);
    }
}
//# sourceMappingURL=offers.js.map