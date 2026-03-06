import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
import type { Offer } from "@gumroad-sdk/sdk";

export function listOffersCommand(): Command {
    return new Command("list")
        .description("List offers for a product")
        .requiredOption("--product-id <id>", "Product ID (required)")
        .option("--json", "Output as JSON")
        .action(async (options: { productId: string; json?: boolean }) => {
            try {
                const client = await getClient();
                const offers = await client.offers.list(options.productId);

                output(offers, options, (data: Offer[]) => {
                    printTable(
                        ["ID", "Name", "Amount Off", "Type", "Max Uses"],
                        data.map((o) => [
                            o.id,
                            o.name,
                            String(o.amount_off),
                            o.offer_type,
                            o.max_purchase_count ? String(o.max_purchase_count) : "∞",
                        ]),
                    );
                });
            } catch (error: unknown) {
                handleError(error);
            }
        });
}
