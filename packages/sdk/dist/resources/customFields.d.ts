import type { GumroadClient } from "../client.js";
import type { CustomField, CreateCustomFieldInput, UpdateCustomFieldInput } from "../types/customField.js";
export declare class CustomFieldsResource {
    private client;
    constructor(client: GumroadClient);
    /**
     * List all custom fields for a product.
     * @param productId - The product ID.
     * @returns A list of custom fields.
     */
    list(productId: string): Promise<CustomField[]>;
    /**
     * Create a new custom field for a product.
     * @param productId - The product ID.
     * @param input - The custom field data.
     * @returns The created custom field.
     */
    create(productId: string, input: CreateCustomFieldInput): Promise<CustomField>;
    /**
     * Update a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to update.
     * @param input - The custom field data.
     * @returns The updated custom field.
     */
    update(productId: string, name: string, input: UpdateCustomFieldInput): Promise<CustomField>;
    /**
     * Delete a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to delete.
     */
    delete(productId: string, name: string): Promise<void>;
}
//# sourceMappingURL=customFields.d.ts.map