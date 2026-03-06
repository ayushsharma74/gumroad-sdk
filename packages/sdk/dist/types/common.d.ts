/**
 * Base error response shape from the Gumroad API.
 */
export interface APIErrorResponse {
    success: false;
    message: string;
}
/**
 * Wrapper for successful API responses.
 */
export interface APIResponse<T> {
    success: true;
    [key: string]: T | boolean;
}
/**
 * Paginated list response from the Gumroad API.
 */
export interface Paginated<T> {
    success: true;
    next_page_url: string | null;
    next_page_key: string | null;
    results: T[];
}
//# sourceMappingURL=common.d.ts.map