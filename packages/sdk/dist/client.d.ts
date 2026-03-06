import { ProductsResource } from "./resources/products.js";
import { SalesResource } from "./resources/sales.js";
import { SubscribersResource } from "./resources/subscribers.js";
import { LicensesResource } from "./resources/licenses.js";
import { OffersResource } from "./resources/offers.js";
import { CustomFieldsResource } from "./resources/customFields.js";
export interface GumroadClientOptions {
    accessToken: string;
    baseURL?: string;
    timeout?: number;
    fetch?: typeof globalThis.fetch;
}
export declare class GumroadClient {
    readonly products: ProductsResource;
    readonly sales: SalesResource;
    readonly subscribers: SubscribersResource;
    readonly licenses: LicensesResource;
    readonly offers: OffersResource;
    readonly customFields: CustomFieldsResource;
    private readonly accessToken;
    private readonly baseURL;
    private readonly timeout;
    private readonly fetch;
    constructor(options: GumroadClientOptions);
    request<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", path: string, params?: Record<string, unknown>): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map