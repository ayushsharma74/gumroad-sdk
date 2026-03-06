import { GumroadClient } from "@gumroad/sdk";
import { readConfig } from "./config.js";

export async function validateToken(token: string): Promise<{ valid: boolean; user?: Record<string, unknown>; error?: string }> {
    const client = new GumroadClient({ accessToken: token });
    try {
        const data = await client.request<{ success: boolean; user: Record<string, unknown> }>(
            "GET",
            "/user",
        );
        return { valid: true, user: data.user };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { valid: false, error: message };
    }
}

export async function getToken(): Promise<string | null> {
    const config = await readConfig();
    return config?.accessToken ?? null;
}
