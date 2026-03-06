import { GumroadAPIError, GumroadAuthError, GumroadNetworkError, GumroadTimeoutError, } from "@gumroad/sdk";
export var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["Success"] = 0] = "Success";
    ExitCode[ExitCode["GeneralError"] = 1] = "GeneralError";
    ExitCode[ExitCode["AuthError"] = 2] = "AuthError";
    ExitCode[ExitCode["NotFound"] = 3] = "NotFound";
    ExitCode[ExitCode["ValidationError"] = 4] = "ValidationError";
})(ExitCode || (ExitCode = {}));
export function handleError(error) {
    if (error instanceof GumroadAuthError) {
        console.error(`✗ Authentication error: ${error.message}`);
        process.exit(ExitCode.AuthError);
    }
    if (error instanceof GumroadAPIError) {
        if (error.status === 404) {
            console.error(`✗ Not found: ${error.message}`);
            process.exit(ExitCode.NotFound);
        }
        console.error(`✗ API error (${error.status}): ${error.message}`);
        process.exit(ExitCode.GeneralError);
    }
    if (error instanceof GumroadNetworkError) {
        console.error(`✗ Network error: ${error.message}`);
        process.exit(ExitCode.GeneralError);
    }
    if (error instanceof GumroadTimeoutError) {
        console.error(`✗ Request timed out: ${error.message}`);
        process.exit(ExitCode.GeneralError);
    }
    if (error instanceof Error) {
        console.error(`✗ ${error.message}`);
        process.exit(ExitCode.GeneralError);
    }
    console.error(`✗ An unknown error occurred`);
    process.exit(ExitCode.GeneralError);
}
export function exitWithValidationError(message) {
    console.error(`✗ ${message}`);
    process.exit(ExitCode.ValidationError);
}
//# sourceMappingURL=errors.js.map