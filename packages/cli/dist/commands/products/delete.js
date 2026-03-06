import { Command } from "commander";
import { getClient } from "../../utils/client.js";
import { printJSON, printSuccess } from "../../output.js";
import { handleError } from "../../errors.js";
export function deleteProductCommand() {
    return new Command("delete")
        .description("Delete a product")
        .argument("<id>", "Product ID")
        .option("--confirm", "Skip confirmation")
        .option("--json", "Output as JSON")
        .action(async (id, options) => {
        try {
            if (!options.confirm) {
                console.error(`Warning: This will permanently delete product "${id}". Use --confirm to skip this warning.`);
                const readline = await import("node:readline/promises");
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stderr,
                });
                const answer = await rl.question("Are you sure? (y/N): ");
                rl.close();
                if (answer.toLowerCase() !== "y") {
                    console.error("Aborted.");
                    process.exit(0);
                }
            }
            const client = await getClient();
            await client.products.delete(id);
            if (options.json) {
                printJSON({ success: true, deleted: id });
            }
            else {
                printSuccess(`Product deleted: ${id}`);
            }
        }
        catch (error) {
            handleError(error);
        }
    });
}
//# sourceMappingURL=delete.js.map