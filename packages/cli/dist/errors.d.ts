export declare enum ExitCode {
    Success = 0,
    GeneralError = 1,
    AuthError = 2,
    NotFound = 3,
    ValidationError = 4
}
export declare function handleError(error: unknown): never;
export declare function exitWithValidationError(message: string): never;
//# sourceMappingURL=errors.d.ts.map