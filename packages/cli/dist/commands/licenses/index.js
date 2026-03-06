import { verifyLicenseCommand } from "./verify.js";
import { enableLicenseCommand } from "./enable.js";
export function registerLicenseCommands(program) {
    const licenses = program
        .command("licenses")
        .description("Manage license keys");
    licenses.addCommand(verifyLicenseCommand());
    licenses.addCommand(enableLicenseCommand());
}
//# sourceMappingURL=index.js.map