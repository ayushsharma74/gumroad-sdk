import { Command } from "commander";
import { listSalesCommand } from "./list.js";
import { getSaleCommand } from "./get.js";

export function registerSalesCommands(program: Command): void {
    const sales = program
        .command("sales")
        .description("View sales data");

    sales.addCommand(listSalesCommand());
    sales.addCommand(getSaleCommand());
}
