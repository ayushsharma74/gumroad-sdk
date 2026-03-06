import type { GumroadClient } from "../client.js";
import type { Product, CreateProductInput, UpdateProductInput } from "../types/product.js";
export declare class ProductsResource {
    private client;
    constructor(client: GumroadClient);
    list(): Promise<Product[]>;
    get(productId: string): Promise<Product>;
    create(input: CreateProductInput): Promise<Product>;
    update(productId: string, input: UpdateProductInput): Promise<Product>;
    delete(productId: string): Promise<void>;
    disable(productId: string): Promise<Product>;
    enable(productId: string): Promise<Product>;
    enableOffer(productId: string, offerId: string): Promise<Product>;
    disableOffer(productId: string, offerId: string): Promise<Product>;
}
//# sourceMappingURL=products.d.ts.map