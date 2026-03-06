export class LicensesResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async verify(params) {
        const data = await this.client.request("POST", "/licenses/verify", params);
        return data;
    }
    async enable(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/enable`);
        return data.license;
    }
    async disable(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/disable`);
        return data.license;
    }
    async decrement(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/decrement_uses_count`);
        return data.license;
    }
}
//# sourceMappingURL=licenses.js.map