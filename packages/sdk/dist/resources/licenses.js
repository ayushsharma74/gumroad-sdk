export class LicensesResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Verify a license.
     * @param params - The license verification parameters.
     * @returns The license verification result.
     */
    async verify(params) {
        const data = await this.client.request("POST", "/licenses/verify", params);
        return data;
    }
    /**
     * Enable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async enable(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/enable`);
        return data.license;
    }
    /**
     * Disable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async disable(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/disable`);
        return data.license;
    }
    /**
     * Decrement the uses count of a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async decrement(licenseId) {
        const data = await this.client.request("PUT", `/licenses/${licenseId}/decrement_uses_count`);
        return data.license;
    }
}
//# sourceMappingURL=licenses.js.map