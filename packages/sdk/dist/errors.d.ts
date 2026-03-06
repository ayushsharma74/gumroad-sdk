export declare class GumroadError extends Error {
    constructor(message: string);
}
export declare class GumroadAPIError extends GumroadError {
    readonly status: number;
    readonly raw: unknown;
    constructor(status: number, message: string, raw: unknown);
}
export declare class GumroadAuthError extends GumroadAPIError {
    constructor(message: string, raw: unknown);
}
export declare class GumroadNetworkError extends GumroadError {
    constructor(message: string);
}
export declare class GumroadTimeoutError extends GumroadError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map