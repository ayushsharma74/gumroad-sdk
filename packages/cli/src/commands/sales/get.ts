import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { output, printTable } from "../../output.js";
import { handleError } from "../../errors.js";
import type { Sale } from "@gumroad/sdk";

export function getSaleCommand(): Command {
    return new Command("get")
        .description("Get a sale by ID")
        .argument("<id>", "Sale ID")
        .option("--json", "Output as JSON")
        .action(async (id: string, options: { json?: boolean }) => {
            try {
                const client = await getClient();
                const sale = await client.sales.get(id);

                output(sale, options, (s: Sale) => {
                    printTable(
                        ["Field", "Value"],
                        [
                            ["ID", s.id],
                            ["Product", s.product_name ?? s.product_id],
                            ["Email", s.email ?? s.purchase_email],
                            ["Price", s.formatted_display_price ?? String(s.price)],
                            ["Currency", s.currency_symbol],
                            ["Date", s.created_at ?? s.timestamp],
                            ["Refunded", s.refunded ? "Yes" : "No"],
                            ["Order ID", String(s.order_id)],
                        ],
                    );
                });
            } catch (error: unknown) {
                handleError(error);
            }
        });
}
