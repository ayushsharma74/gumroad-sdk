import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
export function getProductCommand() {
    return new Command("get")
        .description("Get a product by ID")
        .argument("<id>", "Product ID")
        .option("--json", "Output as JSON")
        .action(async (id, options) => {
        try {
            const client = await getClient();
            const product = await client.products.get(id);
            output(product, options, (p) => {
                printTable(["Field", "Value"], [
                    ["ID", p.id],
                    ["Name", p.name],
                    ["Description", p.description ?? ""],
                    ["Price", p.formatted_price ?? `${p.price}`],
                    ["Currency", p.currency],
                    ["Published", p.published ? "Yes" : "No"],
                    ["URL", p.short_url ?? ""],
                    ["Sales", String(p.sales_count ?? 0)],
                    ["Revenue (USD cents)", String(p.sales_usd_cents ?? 0)],
                ]);
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=get.js.map