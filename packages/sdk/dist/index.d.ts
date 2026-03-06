export { GumroadClient } from "./client.js";
export type { GumroadClientOptions } from "./client.js";
export { GumroadError, GumroadAPIError, GumroadAuthError, GumroadNetworkError, GumroadTimeoutError, } from "./errors.js";
export { ProductsResource } from "./resources/products.js";
export { SalesResource } from "./resources/sales.js";
export { SubscribersResource } from "./resources/subscribers.js";
export { LicensesResource } from "./resources/licenses.js";
export { OffersResource } from "./resources/offers.js";
export { CustomFieldsResource } from "./resources/customFields.js";
export type { Product, CreateProductInput, UpdateProductInput, Variant, VariantOption, } from "./types/product.js";
export type { Sale, SaleListParams, CardInfo, ShippingInfo, } from "./types/sale.js";
export type { Subscriber, SubscriberListParams, } from "./types/subscriber.js";
export type { License, LicenseVerifyParams, LicenseVerifyResult, LicensePurchase, } from "./types/license.js";
export type { Offer, CreateOfferInput, } from "./types/offer.js";
export type { CustomField, CreateCustomFieldInput, UpdateCustomFieldInput, } from "./types/customField.js";
export type { APIErrorResponse, APIResponse, Paginated, } from "./types/common.js";
//# sourceMappingURL=index.d.ts.map