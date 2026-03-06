import Table from "cli-table3";

export function renderTable(
    headers: string[],
    rows: string[][],
    options?: { compact?: boolean },
): string {
    const table = new Table({
        head: headers,
        style: {
            head: ["cyan"],
            border: ["gray"],
            compact: options?.compact ?? false,
        },
    });

    for (const row of rows) {
        table.push(row);
    }

    return table.toString();
}
