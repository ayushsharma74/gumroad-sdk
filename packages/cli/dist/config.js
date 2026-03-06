import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
const CONFIG_DIR = path.join(os.homedir(), ".config", "gumroad");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");
export async function readConfig() {
    try {
        const raw = await fs.readFile(CONFIG_PATH, "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export async function writeConfig(config) {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}
export async function clearConfig() {
    try {
        await fs.unlink(CONFIG_PATH);
    }
    catch {
        // Already cleared or never existed
    }
}
export function getConfigPath() {
    return CONFIG_PATH;
}
//# sourceMappingURL=config.js.map