import { describe, it, expect, vi, beforeEach } from "vitest";
import { GumroadClient } from "../src/client.js";
import {
    GumroadAPIError,
    GumroadAuthError,
    GumroadNetworkError,
    GumroadTimeoutError,
} from "../src/errors.js";

function createMockFetch(response: {
    ok?: boolean;
    status?: number;
    body?: unknown;
}) {
    return vi.fn().mockResolvedValue({
        ok: response.ok ?? true,
        status: response.status ?? 200,
        json: vi.fn().mockResolvedValue(response.body ?? { success: true }),
    } as unknown as Response);
}

function createClient(fetchFn: ReturnType<typeof createMockFetch>) {
    return new GumroadClient({
        accessToken: "test-token",
        fetch: fetchFn,
    });
}

describe("GumroadClient", () => {
    describe("request()", () => {
        it("should append access_token to GET requests as query param", async () => {
            const mockFetch = createMockFetch({ body: { success: true, products: [] } });
            const client = createClient(mockFetch);

            await client.products.list();

            const calledUrl = new URL(mockFetch.mock.calls[0]![0] as string);
            expect(calledUrl.searchParams.get("access_token")).toBe("test-token");
        });

        it("should send POST params as form-urlencoded body", async () => {
            const mockFetch = createMockFetch({
                body: { success: true, product: { id: "abc", name: "Test" } },
            });
            const client = createClient(mockFetch);

            await client.products.create({ name: "Test", price: 500 });

            const [, init] = mockFetch.mock.calls[0]!;
            expect((init as RequestInit).headers).toEqual(
                expect.objectContaining({
                    "Content-Type": "application/x-www-form-urlencoded",
                }),
            );
            const body = new URLSearchParams((init as RequestInit).body as string);
            expect(body.get("access_token")).toBe("test-token");
            expect(body.get("name")).toBe("Test");
            expect(body.get("price")).toBe("500");
        });

        it("should throw GumroadAuthError on 401", async () => {
            const mockFetch = createMockFetch({
                ok: false,
                status: 401,
                body: { success: false, message: "Invalid token" },
            });
            const client = createClient(mockFetch);

            await expect(client.products.list()).rejects.toThrow(GumroadAuthError);
        });

        it("should throw GumroadAPIError on non-2xx", async () => {
            const mockFetch = createMockFetch({
                ok: false,
                status: 404,
                body: { success: false, message: "Not found" },
            });
            const client = createClient(mockFetch);

            await expect(client.products.get("nonexistent")).rejects.toThrow(GumroadAPIError);
        });

        it("should throw GumroadNetworkError on fetch failure", async () => {
            const mockFetch = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
            const client = createClient(mockFetch);

            await expect(client.products.list()).rejects.toThrow(GumroadNetworkError);
        });

        it("should throw GumroadTimeoutError on abort", async () => {
            const mockFetch = vi.fn().mockImplementation(() => {
                const error = new DOMException("The operation was aborted", "AbortError");
                return Promise.reject(error);
            });
            const client = new GumroadClient({
                accessToken: "test-token",
                timeout: 1,
                fetch: mockFetch,
            });

            await expect(client.products.list()).rejects.toThrow(GumroadTimeoutError);
        });
    });
});

describe("ProductsResource", () => {
    let mockFetch: ReturnType<typeof createMockFetch>;
    let client: GumroadClient;

    beforeEach(() => {
        mockFetch = createMockFetch({
            body: {
                success: true,
                products: [
                    { id: "prod1", name: "Product 1", price: 1000, currency: "usd" },
                    { id: "prod2", name: "Product 2", price: 2000, currency: "usd" },
                ],
            },
        });
        client = createClient(mockFetch);
    });

    it("should list products", async () => {
        const products = await client.products.list();
        expect(products).toHaveLength(2);
        expect(products[0]!.id).toBe("prod1");
    });

    it("should get a single product", async () => {
        mockFetch = createMockFetch({
            body: {
                success: true,
                product: { id: "prod1", name: "Product 1" },
            },
        });
        client = createClient(mockFetch);

        const product = await client.products.get("prod1");
        expect(product.id).toBe("prod1");
    });

    it("should create a product", async () => {
        mockFetch = createMockFetch({
            body: {
                success: true,
                product: { id: "new-prod", name: "New Product" },
            },
        });
        client = createClient(mockFetch);

        const product = await client.products.create({
            name: "New Product",
            price: 500,
        });
        expect(product.name).toBe("New Product");
    });

    it("should update a product", async () => {
        mockFetch = createMockFetch({
            body: {
                success: true,
                product: { id: "prod1", name: "Updated" },
            },
        });
        client = createClient(mockFetch);

        const product = await client.products.update("prod1", { name: "Updated" });
        expect(product.name).toBe("Updated");
    });

    it("should delete a product", async () => {
        mockFetch = createMockFetch({
            body: { success: true, message: "Deleted" },
        });
        client = createClient(mockFetch);

        await expect(client.products.delete("prod1")).resolves.toBeUndefined();
    });
});

describe("SalesResource", () => {
    it("should list sales", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                sales: [{ id: "sale1" }, { id: "sale2" }],
                next_page_url: null,
                next_page_key: null,
            },
        });
        const client = createClient(mockFetch);

        const result = await client.sales.list();
        expect(result.sales).toHaveLength(2);
    });

    it("should get a single sale", async () => {
        const mockFetch = createMockFetch({
            body: { success: true, sale: { id: "sale1" } },
        });
        const client = createClient(mockFetch);

        const sale = await client.sales.get("sale1");
        expect(sale.id).toBe("sale1");
    });
});

describe("SubscribersResource", () => {
    it("should list subscribers for a product", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                subscribers: [{ id: "sub1" }, { id: "sub2" }],
            },
        });
        const client = createClient(mockFetch);

        const subscribers = await client.subscribers.list({
            product_id: "prod1",
        });
        expect(subscribers).toHaveLength(2);
    });
});

describe("LicensesResource", () => {
    it("should verify a license", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                uses: 1,
                purchase: { seller_id: "seller1" },
            },
        });
        const client = createClient(mockFetch);

        const result = await client.licenses.verify({
            product_permalink: "my-product",
            license_key: "ABCD-1234",
        });
        expect(result.success).toBe(true);
        expect(result.uses).toBe(1);
    });

    it("should enable a license", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                license: { id: "lic1", disabled: false },
            },
        });
        const client = createClient(mockFetch);

        const license = await client.licenses.enable("lic1");
        expect(license.disabled).toBe(false);
    });
});

describe("OffersResource", () => {
    it("should list offers for a product", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                offers: [{ id: "offer1", name: "50% off" }],
            },
        });
        const client = createClient(mockFetch);

        const offers = await client.offers.list("prod1");
        expect(offers).toHaveLength(1);
    });

    it("should create an offer", async () => {
        const mockFetch = createMockFetch({
            body: {
                success: true,
                offer: { id: "new-offer", name: "Holiday sale" },
            },
        });
        const client = createClient(mockFetch);

        const offer = await client.offers.create({
            product_id: "prod1",
            name: "Holiday sale",
            amount_off: 500,
        });
        expect(offer.name).toBe("Holiday sale");
    });

    it("should delete an offer", async () => {
        const mockFetch = createMockFetch({
            body: { success: true, message: "Deleted" },
        });
        const client = createClient(mockFetch);

        await expect(
            client.offers.delete("prod1", "offer1"),
        ).resolves.toBeUndefined();
    });
});
