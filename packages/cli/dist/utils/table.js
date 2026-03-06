import Table from "cli-table3";
export function renderTable(headers, rows, options) {
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
//# sourceMappingURL=table.js.map