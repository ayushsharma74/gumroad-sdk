import { GumroadClient } from "@gumroad/sdk";
import { readConfig } from "../config.js";
let clientInstance = null;
export async function getClient() {
    if (clientInstance) {
        return clientInstance;
    }
    const config = await readConfig();
    if (!config?.accessToken) {
        console.error("✗ Not authenticated. Run `gr auth login` first.");
        process.exit(2);
    }
    clientInstance = new GumroadClient({ accessToken: config.accessToken });
    return clientInstance;
}
export function resetClient() {
    clientInstance = null;
}
//# sourceMappingURL=client.js.map