import type { GumroadClient } from "../client.js";
import type { License, LicenseVerifyParams, LicenseVerifyResult } from "../types/license.js";

export class LicensesResource {
    constructor(private client: GumroadClient) { }

    /**
     * Verify a license.
     * @param params - The license verification parameters.
     * @returns The license verification result.
     */
    async verify(params: LicenseVerifyParams): Promise<LicenseVerifyResult> {
        const data = await this.client.request<LicenseVerifyResult & { success: boolean }>(
            "POST",
            "/licenses/verify",
            params as unknown as Record<string, unknown>,
        );
        return data;
    }

    /**
     * Enable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async enable(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/enable`,
        );
        return data.license;
    }

    /**
     * Disable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async disable(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/disable`,
        );
        return data.license;
    }

    /**
     * Decrement the uses count of a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    async decrement(licenseId: string): Promise<License> {
        const data = await this.client.request<{ success: boolean; license: License }>(
            "PUT",
            `/licenses/${licenseId}/decrement_uses_count`,
        );
        return data.license;
    }
}
