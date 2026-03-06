export class ProductsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list() {
        const data = await this.client.request("GET", "/products");
        return data.products;
    }
    async get(productId) {
        const data = await this.client.request("GET", `/products/${productId}`);
        return data.product;
    }
    async create(input) {
        const data = await this.client.request("POST", "/products", input);
        return data.product;
    }
    async update(productId, input) {
        const data = await this.client.request("PUT", `/products/${productId}`, input);
        return data.product;
    }
    async delete(productId) {
        await this.client.request("DELETE", `/products/${productId}`);
    }
    async enableOffer(productId, offerId) {
        const data = await this.client.request("PUT", `/products/${productId}/offer_codes/${offerId}/enable`);
        return data.product;
    }
    async disableOffer(productId, offerId) {
        const data = await this.client.request("PUT", `/products/${productId}/offer_codes/${offerId}/disable`);
        return data.product;
    }
}
//# sourceMappingURL=products.js.map