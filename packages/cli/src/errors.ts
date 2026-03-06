import {
    GumroadAPIError,
    GumroadAuthError,
    GumroadNetworkError,
    GumroadTimeoutError,
} from "@gumroad-sdk/sdk";

export enum ExitCode {
    Success = 0,
    GeneralError = 1,
    AuthError = 2,
    NotFound = 3,
    ValidationError = 4,
}

export function handleError(error: unknown): never {
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

export function exitWithValidationError(message: string): never {
    console.error(`✗ ${message}`);
    process.exit(ExitCode.ValidationError);
}
