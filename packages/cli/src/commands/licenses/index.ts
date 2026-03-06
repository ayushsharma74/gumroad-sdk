import { Command } from "commander";
import { verifyLicenseCommand } from "./verify.js";
import { enableLicenseCommand } from "./enable.js";

export function registerLicenseCommands(program: Command): void {
    const licenses = program
        .command("licenses")
        .description("Manage license keys");

    licenses.addCommand(verifyLicenseCommand());
    licenses.addCommand(enableLicenseCommand());
}
