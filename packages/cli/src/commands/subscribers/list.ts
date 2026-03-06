import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
import type { Subscriber } from "@gumroad/sdk";

export function listSubscribersCommand(): Command {
    return new Command("list")
        .description("List subscribers for a product")
        .requiredOption("--product-id <id>", "Product ID (required)")
        .option("--json", "Output as JSON")
        .action(async (options: { productId: string; json?: boolean }) => {
            try {
                const client = await getClient();
                const subscribers = await client.subscribers.list({
                    product_id: options.productId,
                });

                output(subscribers, options, (subs: Subscriber[]) => {
                    printTable(
                        ["ID", "Email", "Status", "Created"],
                        subs.map((s) => [
                            s.id,
                            s.user_email,
                            s.status,
                            s.created_at,
                        ]),
                    );
                });
            } catch (error: unknown) {
                handleError(error);
            }
        });
}
