import type { GumroadClient } from "../client.js";
import type { CustomField, CreateCustomFieldInput, UpdateCustomFieldInput } from "../types/customField.js";

export class CustomFieldsResource {
    constructor(private client: GumroadClient) { }

    /**
     * List all custom fields for a product.
     * @param productId - The product ID.
     * @returns A list of custom fields.
     */
    async list(productId: string): Promise<CustomField[]> {
        const data = await this.client.request<{ success: boolean; custom_fields: CustomField[] }>(
            "GET",
            `/products/${productId}/custom_fields`,
        );
        return data.custom_fields;
    }

    /**
     * Create a new custom field for a product.
     * @param productId - The product ID.
     * @param input - The custom field data.
     * @returns The created custom field.
     */
    async create(productId: string, input: CreateCustomFieldInput): Promise<CustomField> {
        const data = await this.client.request<{ success: boolean; custom_field: CustomField }>(
            "POST",
            `/products/${productId}/custom_fields`,
            input as unknown as Record<string, unknown>,
        );
        return data.custom_field;
    }

    /**
     * Update a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to update.
     * @param input - The custom field data.
     * @returns The updated custom field.
     */
    async update(productId: string, name: string, input: UpdateCustomFieldInput): Promise<CustomField> {
        const data = await this.client.request<{ success: boolean; custom_field: CustomField }>(
            "PUT",
            `/products/${productId}/custom_fields/${encodeURIComponent(name)}`,
            input as unknown as Record<string, unknown>,
        );
        return data.custom_field;
    }

    /**
     * Delete a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to delete.
     */
    async delete(productId: string, name: string): Promise<void> {
        await this.client.request<{ success: boolean; message: string }>(
            "DELETE",
            `/products/${productId}/custom_fields/${encodeURIComponent(name)}`,
        );
    }
}
