import type { GumroadClient } from "../client.js";
import type { Sale, SaleListParams } from "../types/sale.js";
export declare class SalesResource {
    private client;
    constructor(client: GumroadClient);
    list(params?: SaleListParams): Promise<{
        sales: Sale[];
        next_page_url: string | null;
        next_page_key: string | null;
    }>;
    get(saleId: string): Promise<Sale>;
}
//# sourceMappingURL=sales.d.ts.map