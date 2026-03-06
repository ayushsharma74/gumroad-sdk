import type { GumroadClient } from "../client.js";
import type {
    Product,
    CreateProductInput,
    UpdateProductInput,
} from "../types/product.js";

export class ProductsResource {
    constructor(private client: GumroadClient) { }

    async list(): Promise<Product[]> {
        const data = await this.client.request<{ success: boolean; products: Product[] }>(
            "GET",
            "/products",
        );
        return data.products;
    }

    async get(productId: string): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "GET",
            `/products/${productId}`,
        );
        return data.product;
    }

    async create(input: CreateProductInput): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "POST",
            "/products",
            input as unknown as Record<string, unknown>,
        );
        return data.product;
    }

    async update(productId: string, input: UpdateProductInput): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "PUT",
            `/products/${productId}`,
            input as unknown as Record<string, unknown>,
        );
        return data.product;
    }

    async delete(productId: string): Promise<void> {
        await this.client.request<{ success: boolean; message: string }>(
            "DELETE",
            `/products/${productId}`,
        );
    }

    async disable(productId: string): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "PUT",
            `/products/${productId}/disable`,
        );
        return data.product;
    }

    async enable(productId: string): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "PUT",
            `/products/${productId}/enable`,
        );
        return data.product;
    }

    async enableOffer(productId: string, offerId: string): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "PUT",
            `/products/${productId}/offer_codes/${offerId}/enable`,
        );
        return data.product;
    }

    async disableOffer(productId: string, offerId: string): Promise<Product> {
        const data = await this.client.request<{ success: boolean; product: Product }>(
            "PUT",
            `/products/${productId}/offer_codes/${offerId}/disable`,
        );
        return data.product;
    }
}
