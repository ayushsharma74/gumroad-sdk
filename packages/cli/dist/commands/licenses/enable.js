import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
export function enableLicenseCommand() {
    return new Command("enable")
        .description("Enable a disabled license")
        .argument("<id>", "License ID")
        .option("--json", "Output as JSON")
        .action(async (id, options) => {
        try {
            const client = await getClient();
            const license = await client.licenses.enable(id);
            output(license, options, (l) => {
                printSuccess(`License enabled: ${l.id}`);
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=enable.js.map