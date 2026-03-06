export declare function printJSON(data: unknown): void;
export declare function printTable(headers: string[], rows: string[][]): void;
export declare function printSuccess(message: string): void;
export declare function printError(message: string): void;
export declare function output<T>(data: T, options: {
    json?: boolean;
}, formatter: (d: T) => void): void;
//# sourceMappingURL=output.d.ts.map