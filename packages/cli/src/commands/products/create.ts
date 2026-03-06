import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
import { requireOption, parsePrice } from "../../utils/validators.js";
import type { Product } from "@gumroad/sdk";

export function createProductCommand(): Command {
    return new Command("create")
        .description("Create a new product")
        .requiredOption("--name <name>", "Product name")
        .requiredOption("--price <price>", "Product price in cents")
        .option("--description <description>", "Product description")
        .option("--json", "Output as JSON")
        .action(
            async (options: {
                name: string;
                price: string;
                description?: string;
                json?: boolean;
            }) => {
                try {
                    const name = requireOption(options.name, "name");
                    const price = parsePrice(options.price);

                    const client = await getClient();
                    const input: Parameters<typeof client.products.create>[0] = { name, price };
                    if (options.description !== undefined) input.description = options.description;
                    const product = await client.products.create(input);

                    output(product, options, (_p: Product) => {
                        printSuccess(`Product created: ${_p.name} (${_p.id})`);
                    });
                } catch (error: unknown) {
                    handleError(error);
                }
            },
        );
}
