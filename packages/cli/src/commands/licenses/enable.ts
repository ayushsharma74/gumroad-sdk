import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
import type { License } from "@gumroad/sdk";

export function enableLicenseCommand(): Command {
    return new Command("enable")
        .description("Enable a disabled license")
        .argument("<id>", "License ID")
        .option("--json", "Output as JSON")
        .action(async (id: string, options: { json?: boolean }) => {
            try {
                const client = await getClient();
                const license = await client.licenses.enable(id);

                output(license, options, (l: License) => {
                    printSuccess(`License enabled: ${l.id}`);
                });
            } catch (error: unknown) {
                handleError(error);
            }
        });
}
