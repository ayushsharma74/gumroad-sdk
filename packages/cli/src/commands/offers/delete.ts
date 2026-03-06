import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { printJSON, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";

export function deleteOfferCommand(): Command {
    return new Command("delete")
        .description("Delete an offer code")
        .argument("<id>", "Offer ID")
        .requiredOption("--product-id <productId>", "Product ID the offer belongs to")
        .option("--json", "Output as JSON")
        .action(async (id: string, options: { productId: string; json?: boolean }) => {
            try {
                const client = await getClient();
                await client.offers.delete(options.productId, id);

                if (options.json) {
                    printJSON({ success: true, deleted: id });
                } else {
                    printSuccess(`Offer deleted: ${id}`);
                }
            } catch (error: unknown) {
                handleError(error);
            }
        });
}
