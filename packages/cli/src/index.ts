#!/usr/bin/env node

import { Command } from "commander";
import { registerAuthCommands } from "./commands/auth/index.js";
import { registerProductCommands } from "./commands/products/index.js";
import { registerSalesCommands } from "./commands/sales/index.js";
import { registerSubscriberCommands } from "./commands/subscribers/index.js";
import { registerLicenseCommands } from "./commands/licenses/index.js";
import { registerOfferCommands } from "./commands/offers/index.js";

const program = new Command();

program
    .name("gr")
    .description("Gumroad CLI — manage your Gumroad products, sales, and more")
    .version("0.1.0");

registerAuthCommands(program);
registerProductCommands(program);
registerSalesCommands(program);
registerSubscriberCommands(program);
registerLicenseCommands(program);
registerOfferCommands(program);

program.parse();
