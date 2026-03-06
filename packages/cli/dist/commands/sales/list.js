import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
export function listSalesCommand() {
    return new Command("list")
        .description("List sales")
        .option("--product-id <id>", "Filter by product ID")
        .option("--after <date>", "Filter sales after this date (ISO 8601)")
        .option("--before <date>", "Filter sales before this date (ISO 8601)")
        .option("--json", "Output as JSON")
        .action(async (options) => {
        try {
            const client = await getClient();
            const params = {};
            if (options.productId !== undefined)
                params.product_id = options.productId;
            if (options.after !== undefined)
                params.after = options.after;
            if (options.before !== undefined)
                params.before = options.before;
            const result = await client.sales.list(params);
            output(result.sales, options, (sales) => {
                printTable(["ID", "Product", "Email", "Price", "Date"], sales.map((s) => [
                    s.id,
                    s.product_name ?? s.product_id,
                    s.email ?? s.purchase_email,
                    s.formatted_display_price ?? String(s.price),
                    s.created_at ?? s.timestamp,
                ]));
            });
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=list.js.map