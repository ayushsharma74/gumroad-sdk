export interface GumroadConfig {
    accessToken: string;
    defaultOutputFormat?: "table" | "json";
}
export declare function readConfig(): Promise<GumroadConfig | null>;
export declare function writeConfig(config: GumroadConfig): Promise<void>;
export declare function clearConfig(): Promise<void>;
export declare function getConfigPath(): string;
//# sourceMappingURL=config.d.ts.map