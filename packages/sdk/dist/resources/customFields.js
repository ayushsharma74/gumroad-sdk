export class CustomFieldsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * List all custom fields for a product.
     * @param productId - The product ID.
     * @returns A list of custom fields.
     */
    async list(productId) {
        const data = await this.client.request("GET", `/products/${productId}/custom_fields`);
        return data.custom_fields;
    }
    /**
     * Create a new custom field for a product.
     * @param productId - The product ID.
     * @param input - The custom field data.
     * @returns The created custom field.
     */
    async create(productId, input) {
        const data = await this.client.request("POST", `/products/${productId}/custom_fields`, input);
        return data.custom_field;
    }
    /**
     * Update a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to update.
     * @param input - The custom field data.
     * @returns The updated custom field.
     */
    async update(productId, name, input) {
        const data = await this.client.request("PUT", `/products/${productId}/custom_fields/${encodeURIComponent(name)}`, input);
        return data.custom_field;
    }
    /**
     * Delete a custom field.
     * @param productId - The product ID.
     * @param name - The name of the custom field to delete.
     */
    async delete(productId, name) {
        await this.client.request("DELETE", `/products/${productId}/custom_fields/${encodeURIComponent(name)}`);
    }
}
//# sourceMappingURL=customFields.js.map