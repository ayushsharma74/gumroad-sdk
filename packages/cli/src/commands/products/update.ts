import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
import type { Product, UpdateProductInput } from "@gumroad/sdk";

export function updateProductCommand(): Command {
    return new Command("update")
        .description("Update an existing product")
        .argument("<id>", "Product ID")
        .option("--name <name>", "New product name")
        .option("--price <price>", "New product price in cents")
        .option("--description <description>", "New description")
        .option("--json", "Output as JSON")
        .action(
            async (
                id: string,
                options: {
                    name?: string;
                    price?: string;
                    description?: string;
                    json?: boolean;
                },
            ) => {
                try {
                    const updates: UpdateProductInput = {};
                    if (options.name) updates.name = options.name;
                    if (options.price) updates.price = parseInt(options.price, 10);
                    if (options.description) updates.description = options.description;

                    const client = await getClient();
                    const product = await client.products.update(id, updates);

                    output(product, options, (p: Product) => {
                        printSuccess(`Product updated: ${p.name} (${p.id})`);
                    });
                } catch (error: unknown) {
                    handleError(error);
                }
            },
        );
}
