import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
import { requireOption, parsePrice } from "../../utils/validators.js";
export function createOfferCommand() {
    return new Command("create")
        .description("Create a new offer code")
        .requiredOption("--product-id <id>", "Product ID")
        .requiredOption("--name <name>", "Offer name / code")
        .requiredOption("--amount-off <amount>", "Amount off in cents")
        .option("--offer-type <type>", "Type: cents or percent", "cents")
        .option("--max-purchase-count <n>", "Maximum number of uses")
        .option("--json", "Output as JSON")
        .action(async (options) => {
        try {
            const name = requireOption(options.name, "name");
            const amountOff = parsePrice(options.amountOff);
            const client = await getClient();
            const input = {
                product_id: options.productId,
                name,
                amount_off: amountOff,
            };
            if (options.offerType !== undefined)
                input.offer_type = options.offerType;
            if (options.maxPurchaseCount !== undefined)
                input.max_purchase_count = parseInt(options.maxPurchaseCount, 10);
            const offer = await client.offers.create(input);
            output(offer, options, (o) => {
                printSuccess(`Offer created: ${o.name} (${o.id})`);
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=create.js.map