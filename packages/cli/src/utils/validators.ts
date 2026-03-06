import { exitWithValidationError } from "../errors.js";

export function requireOption(value: string | undefined, name: string): string {
    if (!value || value.trim() === "") {
        exitWithValidationError(`Missing required option: --${name}`);
    }
    return value;
}

export function parsePrice(value: string): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 0) {
        exitWithValidationError(`Invalid price: "${value}". Must be a non-negative integer (cents).`);
    }
    return parsed;
}

export function parseDate(value: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        exitWithValidationError(`Invalid date: "${value}". Use ISO 8601 format (e.g., 2024-01-01).`);
    }
    return value;
}
