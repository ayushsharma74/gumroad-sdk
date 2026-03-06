import type { GumroadClient } from "../client.js";
import type { License, LicenseVerifyParams, LicenseVerifyResult } from "../types/license.js";

export class LicensesResource {
    constructor(private client: GumroadClient) { }

    async verify(params: LicenseVerifyParams): Promise<LicenseVerifyResult> {
        const data = await this.client.request<LicenseVerifyResult & { success: boolean }>(
            "POST",
            "/licenses/verify",
            params as unknown as Record<string, unknown>,
        );
        return data;
    }

    async enable(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/enable`,
        );
        return data.license;
    }

    async disable(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/disable`,
        );
        return data.license;
    }

    async decrement(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/decrement_uses_count`,
        );
        return data.license;
    }
}
