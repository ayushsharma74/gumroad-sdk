import Table from "cli-table3";
export function printJSON(data) {
    console.log(JSON.stringify(data, null, 2));
}
export function printTable(headers, rows) {
    const table = new Table({
        head: headers,
        style: { head: ["cyan"], border: ["gray"] },
    });
    for (const row of rows) {
        table.push(row);
    }
    console.log(table.toString());
}
export function printSuccess(message) {
    console.error(`✓ ${message}`);
}
export function printError(message) {
    console.error(`✗ ${message}`);
}
export function output(data, options, formatter) {
    if (options.json) {
        printJSON(data);
    }
    else {
        formatter(data);
    }
}
//# sourceMappingURL=output.js.map