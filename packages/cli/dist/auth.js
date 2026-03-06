import { GumroadClient } from "@gumroad/sdk";
import { readConfig } from "./config.js";
export async function validateToken(token) {
    const client = new GumroadClient({ accessToken: token });
    try {
        const data = await client.request("GET", "/user");
        return { valid: true, user: data.user };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { valid: false, error: message };
    }
}
export async function getToken() {
    const config = await readConfig();
    return config?.accessToken ?? null;
}
//# sourceMappingURL=auth.js.map