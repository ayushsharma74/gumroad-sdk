import Table from "cli-table3";

export function printJSON(data: unknown): void {
    console.log(JSON.stringify(data, null, 2));
}

export function printTable(headers: string[], rows: string[][]): void {
    const table = new Table({
        head: headers,
        style: { head: ["cyan"], border: ["gray"] },
    });
    for (const row of rows) {
        table.push(row);
    }
    console.log(table.toString());
}

export function printSuccess(message: string): void {
    console.error(`✓ ${message}`);
}

export function printError(message: string): void {
    console.error(`✗ ${message}`);
}

export function output<T>(
    data: T,
    options: { json?: boolean },
    formatter: (d: T) => void,
): void {
    if (options.json) {
        printJSON(data);
    } else {
        formatter(data);
    }
}
