import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
import { requireOption, parsePrice } from "../../utils/validators.js";
export function createProductCommand() {
    return new Command("create")
        .description("Create a new product")
        .requiredOption("--name <name>", "Product name")
        .requiredOption("--price <price>", "Product price in cents")
        .option("--description <description>", "Product description")
        .option("--json", "Output as JSON")
        .action(async (options) => {
        try {
            const name = requireOption(options.name, "name");
            const price = parsePrice(options.price);
            const client = await getClient();
            const input = { name, price };
            if (options.description !== undefined)
                input.description = options.description;
            const product = await client.products.create(input);
            output(product, options, (_p) => {
                printSuccess(`Product created: ${_p.name} (${_p.id})`);
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=create.js.map