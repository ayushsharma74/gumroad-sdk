import type { GumroadClient } from "../client.js";
import type { License, LicenseVerifyParams, LicenseVerifyResult } from "../types/license.js";
export declare class LicensesResource {
    private client;
    constructor(client: GumroadClient);
    verify(params: LicenseVerifyParams): Promise<LicenseVerifyResult>;
    enable(licenseId: string): Promise<License>;
    disable(licenseId: string): Promise<License>;
    decrement(licenseId: string): Promise<License>;
}
//# sourceMappingURL=licenses.d.ts.map