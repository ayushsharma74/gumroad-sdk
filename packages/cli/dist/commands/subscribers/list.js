import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
export function listSubscribersCommand() {
    return new Command("list")
        .description("List subscribers for a product")
        .requiredOption("--product-id <id>", "Product ID (required)")
        .option("--json", "Output as JSON")
        .action(async (options) => {
        try {
            const client = await getClient();
            const subscribers = await client.subscribers.list({
                product_id: options.productId,
            });
            output(subscribers, options, (subs) => {
                printTable(["ID", "Email", "Status", "Created"], subs.map((s) => [
                    s.id,
                    s.user_email,
                    s.status,
                    s.created_at,
                ]));
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=list.js.map