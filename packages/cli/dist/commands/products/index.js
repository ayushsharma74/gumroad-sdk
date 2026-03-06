import { listProductsCommand } from "./list.js";
import { getProductCommand } from "./get.js";
import { createProductCommand } from "./create.js";
import { updateProductCommand } from "./update.js";
import { deleteProductCommand } from "./delete.js";
export function registerProductCommands(program) {
    const products = program
        .command("products")
        .description("Manage products");
    products.addCommand(listProductsCommand());
    products.addCommand(getProductCommand());
    products.addCommand(createProductCommand());
    products.addCommand(updateProductCommand());
    products.addCommand(deleteProductCommand());
}
//# sourceMappingURL=index.js.map