import { Command } from "commander";
import { clearConfig } from "../../config.js";
import { printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
export function logoutCommand() {
    return new Command("logout")
        .description("Remove stored authentication credentials")
        .action(async () => {
        try {
            await clearConfig();
            printSuccess("Logged out successfully. Token removed.");
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=logout.js.map