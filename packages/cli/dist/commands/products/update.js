import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
export function updateProductCommand() {
    return new Command("update")
        .description("Update an existing product")
        .argument("<id>", "Product ID")
        .option("--name <name>", "New product name")
        .option("--price <price>", "New product price in cents")
        .option("--description <description>", "New description")
        .option("--json", "Output as JSON")
        .action(async (id, options) => {
        try {
            const updates = {};
            if (options.name)
                updates.name = options.name;
            if (options.price)
                updates.price = parseInt(options.price, 10);
            if (options.description)
                updates.description = options.description;
            const client = await getClient();
            const product = await client.products.update(id, updates);
            output(product, options, (p) => {
                printSuccess(`Product updated: ${p.name} (${p.id})`);
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=update.js.map