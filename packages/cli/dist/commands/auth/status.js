import { Command } from "commander";
import { readConfig, getConfigPath } from "../../config.js";
import { printJSON } from "../../output.js";
import { handleError } from "../../errors.js";
export function statusCommand() {
    return new Command("status")
        .description("Show current authentication status")
        .option("--json", "Output result as JSON")
        .action(async (options) => {
        try {
            const config = await readConfig();
            const status = {
                authenticated: !!config?.accessToken,
                configPath: getConfigPath(),
                tokenPreview: config?.accessToken
                    ? `${config.accessToken.substring(0, 8)}...`
                    : null,
            };
            if (options.json) {
                printJSON(status);
            }
            else {
                if (status.authenticated) {
                    console.error(`✓ Authenticated (token: ${status.tokenPreview})`);
                }
                else {
                    console.error("✗ Not authenticated. Run `gr auth login` to authenticate.");
                }
                console.error(`  Config: ${status.configPath}`);
            }
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=status.js.map