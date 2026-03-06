import { Command } from "commander";
import * as readline from "node:readline/promises";
import { writeConfig } from "../../config.js";
import { validateToken } from "../../auth.js";
import { printJSON, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
export function loginCommand() {
    return new Command("login")
        .description("Authenticate with your Gumroad API token")
        .option("--with-token <token>", "Provide token directly (non-interactive)")
        .option("--json", "Output result as JSON")
        .action(async (options) => {
        try {
            let token = options.withToken;
            if (!token) {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stderr,
                });
                token = await rl.question("Enter your Gumroad access token: ");
                rl.close();
            }
            if (!token || token.trim() === "") {
                console.error("✗ No token provided.");
                process.exit(4);
            }
            token = token.trim();
            const result = await validateToken(token);
            if (!result.valid) {
                console.error(`✗ Invalid token: ${result.error}`);
                process.exit(2);
            }
            await writeConfig({ accessToken: token });
            if (options.json) {
                printJSON({ success: true, user: result.user });
            }
            else {
                printSuccess("Authenticated successfully!");
            }
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=login.js.map