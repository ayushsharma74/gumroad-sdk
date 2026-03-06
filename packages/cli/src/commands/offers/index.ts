import { Command } from "commander";
import { listOffersCommand } from "./list.js";
import { createOfferCommand } from "./create.js";
import { deleteOfferCommand } from "./delete.js";

export function registerOfferCommands(program: Command): void {
    const offers = program
        .command("offers")
        .description("Manage offer codes");

    offers.addCommand(listOffersCommand());
    offers.addCommand(createOfferCommand());
    offers.addCommand(deleteOfferCommand());
}
