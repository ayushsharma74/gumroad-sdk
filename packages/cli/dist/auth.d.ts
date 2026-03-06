export declare function validateToken(token: string): Promise<{
    valid: boolean;
    user?: Record<string, unknown>;
    error?: string;
}>;
export declare function getToken(): Promise<string | null>;
//# sourceMappingURL=auth.d.ts.map