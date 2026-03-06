export class GumroadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GumroadError";
    }
}

export class GumroadAPIError extends GumroadError {
    public readonly status: number;
    public readonly raw: unknown;

    constructor(status: number, message: string, raw: unknown) {
        super(message);
        this.name = "GumroadAPIError";
        this.status = status;
        this.raw = raw;
    }
}

export class GumroadAuthError extends GumroadAPIError {
    constructor(message: string, raw: unknown) {
        super(401, message, raw);
        this.name = "GumroadAuthError";
    }
}

export class GumroadNetworkError extends GumroadError {
    constructor(message: string) {
        super(message);
        this.name = "GumroadNetworkError";
    }
}

export class GumroadTimeoutError extends GumroadError {
    constructor(message: string) {
        super(message);
        this.name = "GumroadTimeoutError";
    }
}
