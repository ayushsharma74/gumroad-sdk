export class GumroadError extends Error {
    constructor(message) {
        super(message);
        this.name = "GumroadError";
    }
}
export class GumroadAPIError extends GumroadError {
    status;
    raw;
    constructor(status, message, raw) {
        super(message);
        this.name = "GumroadAPIError";
        this.status = status;
        this.raw = raw;
    }
}
export class GumroadAuthError extends GumroadAPIError {
    constructor(message, raw) {
        super(401, message, raw);
        this.name = "GumroadAuthError";
    }
}
export class GumroadNetworkError extends GumroadError {
    constructor(message) {
        super(message);
        this.name = "GumroadNetworkError";
    }
}
export class GumroadTimeoutError extends GumroadError {
    constructor(message) {
        super(message);
        this.name = "GumroadTimeoutError";
    }
}
//# sourceMappingURL=errors.js.map