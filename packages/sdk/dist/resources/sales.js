export class SalesResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const data = await this.client.request("GET", "/sales", params);
        return {
            sales: data.sales,
            next_page_url: data.next_page_url,
            next_page_key: data.next_page_key,
        };
    }
    async get(saleId) {
        const data = await this.client.request("GET", `/sales/${saleId}`);
        return data.sale;
    }
}
//# sourceMappingURL=sales.js.map