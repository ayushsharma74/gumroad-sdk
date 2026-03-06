import type { GumroadClient } from "../client.js";
import type { License, LicenseVerifyParams, LicenseVerifyResult } from "../types/license.js";
export declare class LicensesResource {
    private client;
    constructor(client: GumroadClient);
    /**
     * Verify a license.
     * @param params - The license verification parameters.
     * @returns The license verification result.
     */
    verify(params: LicenseVerifyParams): Promise<LicenseVerifyResult>;
    /**
     * Enable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    enable(licenseId: string): Promise<License>;
    /**
     * Disable a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    disable(licenseId: string): Promise<License>;
    /**
     * Decrement the uses count of a license.
     * @param licenseId - The license ID.
     * @returns The updated license.
     */
    decrement(licenseId: string): Promise<License>;
}
//# sourceMappingURL=licenses.d.ts.map