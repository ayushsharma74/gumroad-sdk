import { GumroadAPIError, GumroadAuthError, GumroadNetworkError, GumroadTimeoutError } from "./errors.js";
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

export class GumroadClient {
    readonly products: ProductsResource;
    readonly sales: SalesResource;
    readonly subscribers: SubscribersResource;
    readonly licenses: LicensesResource;
    readonly offers: OffersResource;
    readonly customFields: CustomFieldsResource;

    private readonly accessToken: string;
    private readonly baseURL: string;
    private readonly timeout: number;
    private readonly fetch: typeof globalThis.fetch;

    constructor(options: GumroadClientOptions) {
        this.accessToken = options.accessToken;
        this.baseURL = options.baseURL ?? "https://api.gumroad.com/v2";
        this.timeout = options.timeout ?? 10_000;
        this.fetch = options.fetch ?? globalThis.fetch;

        this.products = new ProductsResource(this);
        this.sales = new SalesResource(this);
        this.subscribers = new SubscribersResource(this);
        this.licenses = new LicensesResource(this);
        this.offers = new OffersResource(this);
        this.customFields = new CustomFieldsResource(this);
    }

    async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        path: string,
        params?: Record<string, unknown>,
    ): Promise<T> {
        const url = new URL(`${this.baseURL}${path}`);
        const allParams: Record<string, unknown> = {
            access_token: this.accessToken,
            ...params,
        };

        const init: RequestInit = { method };
        const controller = new AbortController();
        init.signal = controller.signal;

        if (method === "GET" || method === "DELETE") {
            for (const [key, value] of Object.entries(allParams)) {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            }
        } else {
            const body = new URLSearchParams();
            for (const [key, value] of Object.entries(allParams)) {
                if (value !== undefined && value !== null) {
                    body.set(key, String(value));
                }
            }
            init.body = body.toString();
            init.headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
        }

        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        let response: Response;
        try {
            response = await this.fetch(url.toString(), init);
        } catch (error: unknown) {
            clearTimeout(timeoutId);
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new GumroadTimeoutError(`Request timed out after ${this.timeout}ms: ${method} ${path}`);
            }
            const message = error instanceof Error ? error.message : "Unknown network error";
            throw new GumroadNetworkError(`Network error: ${message}`);
        } finally {
            clearTimeout(timeoutId);
        }

        let data: unknown;
        try {
            data = await response.json();
        } catch {
            throw new GumroadAPIError(
                response.status,
                `Failed to parse API response as JSON`,
                null,
            );
        }

        if (!response.ok) {
            const message =
                typeof data === "object" && data !== null && "message" in data
                    ? String((data as Record<string, unknown>).message)
                    : `API error: ${response.status}`;

            if (response.status === 401) {
                throw new GumroadAuthError(message, data);
            }

            throw new GumroadAPIError(response.status, message, data);
        }

        return data as T;
    }
}
