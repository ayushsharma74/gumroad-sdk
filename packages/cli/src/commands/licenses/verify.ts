import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
import type { LicenseVerifyResult } from "@gumroad/sdk";

export function verifyLicenseCommand(): Command {
    return new Command("verify")
        .description("Verify a license key")
        .requiredOption("--product-permalink <permalink>", "Product permalink")
        .requiredOption("--license-key <key>", "License key to verify")
        .option("--json", "Output as JSON")
        .action(
            async (options: {
                productPermalink: string;
                licenseKey: string;
                json?: boolean;
            }) => {
                try {
                    const client = await getClient();
                    const result = await client.licenses.verify({
                        product_permalink: options.productPermalink,
                        license_key: options.licenseKey,
                    });

                    output(result, options, (r: LicenseVerifyResult) => {
                        printTable(
                            ["Field", "Value"],
                            [
                                ["Valid", r.success ? "Yes" : "No"],
                                ["Uses", String(r.uses)],
                            ],
                        );
                    });
                } catch (error: unknown) {
                    handleError(error);
                }
            },
        );
}
