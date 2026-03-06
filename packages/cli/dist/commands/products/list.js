import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
export function listProductsCommand() {
    return new Command("list")
        .description("List all products")
        .option("--json", "Output as JSON")
        .option("--limit <n>", "Limit number of results")
        .action(async (options) => {
        try {
            const client = await getClient();
            let products = await client.products.list();
            if (options.limit) {
                const limit = parseInt(options.limit, 10);
                products = products.slice(0, limit);
            }
            output(products, options, (data) => {
                printTable(["ID", "Name", "Price", "Published", "Sales"], data.map((p) => [
                    p.id,
                    p.name,
                    p.formatted_price ?? `${p.price}`,
                    p.published ? "Yes" : "No",
                    String(p.sales_count ?? 0),
                ]));
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=list.js.map