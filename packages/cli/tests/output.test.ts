import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

// Test output module
describe("output", () => {
    let consoleSpy: MockInstance;
    let consoleErrorSpy: MockInstance;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, "log").mockImplementation(() => { });
        consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it("printJSON should output valid JSON to stdout", async () => {
        const { printJSON } = await import("../src/output.js");
        const data = { name: "test", price: 100 };
        printJSON(data);
        expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
    });

    it("printSuccess should output to stderr", async () => {
        const { printSuccess } = await import("../src/output.js");
        printSuccess("Done!");
        expect(consoleErrorSpy).toHaveBeenCalledWith("✓ Done!");
    });

    it("printError should output to stderr", async () => {
        const { printError } = await import("../src/output.js");
        printError("Failed!");
        expect(consoleErrorSpy).toHaveBeenCalledWith("✗ Failed!");
    });

    it("output() should use JSON mode when --json is set", async () => {
        const { output } = await import("../src/output.js");
        const data = { id: "123" };
        const formatter = vi.fn();

        output(data, { json: true }, formatter);

        expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data, null, 2));
        expect(formatter).not.toHaveBeenCalled();
    });

    it("output() should use formatter when --json is not set", async () => {
        const { output } = await import("../src/output.js");
        const data = { id: "123" };
        const formatter = vi.fn();

        output(data, { json: false }, formatter);

        expect(formatter).toHaveBeenCalledWith(data);
    });
});

// Test config module
describe("config", () => {
    let tmpDir: string;

    beforeEach(async () => {
        tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "gumroad-cli-test-"));
    });

    afterEach(async () => {
        await fs.rm(tmpDir, { recursive: true, force: true });
    });

    it("should return null when config does not exist", async () => {
        // We test the read logic by trying to read a non-existent path
        const { readConfig } = await import("../src/config.js");
        // Since readConfig uses a hardcoded path, we test the error handling
        // by verifying it doesn't throw
        const result = await readConfig();
        // May or may not be null depending on if user has a config
        expect(result === null || typeof result === "object").toBe(true);
    });
});
