import { listSalesCommand } from "./list.js";
import { getSaleCommand } from "./get.js";
export function registerSalesCommands(program) {
    const sales = program
        .command("sales")
        .description("View sales data");
    sales.addCommand(listSalesCommand());
    sales.addCommand(getSaleCommand());
}
//# sourceMappingURL=index.js.map