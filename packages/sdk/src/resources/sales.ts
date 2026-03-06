import type { GumroadClient } from "../client.js";
import type { Sale, SaleListParams } from "../types/sale.js";

export class SalesResource {
    constructor(private client: GumroadClient) { }

    async list(params?: SaleListParams): Promise<{ sales: Sale[]; next_page_url: string | null; next_page_key: string | null }> {
        const data = await this.client.request<{
            success: boolean;
            sales: Sale[];
            next_page_url: string | null;
            next_page_key: string | null;
        }>(
            "GET",
            "/sales",
            params as unknown as Record<string, unknown>,
        );
        return {
            sales: data.sales,
            next_page_url: data.next_page_url,
            next_page_key: data.next_page_key,
        };
    }

    async get(saleId: string): Promise<Sale> {
        const data = await this.client.request<{ success: boolean; sale: Sale }>(
            "GET",
            `/sales/${saleId}`,
        );
        return data.sale;
    }
}
