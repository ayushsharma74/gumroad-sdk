// Client
export { GumroadClient } from "./client.js";
export type { GumroadClientOptions } from "./client.js";

// Errors
export {
    GumroadError,
    GumroadAPIError,
    GumroadAuthError,
    GumroadNetworkError,
    GumroadTimeoutError,
} from "./errors.js";

// Resources
export { ProductsResource } from "./resources/products.js";
export { SalesResource } from "./resources/sales.js";
export { SubscribersResource } from "./resources/subscribers.js";
export { LicensesResource } from "./resources/licenses.js";
export { OffersResource } from "./resources/offers.js";
export { CustomFieldsResource } from "./resources/customFields.js";

// Types — Product
export type {
    Product,
    CreateProductInput,
    UpdateProductInput,
    Variant,
    VariantOption,
} from "./types/product.js";

// Types — Sale
export type {
    Sale,
    SaleListParams,
    CardInfo,
    ShippingInfo,
} from "./types/sale.js";

// Types — Subscriber
export type {
    Subscriber,
    SubscriberListParams,
} from "./types/subscriber.js";

// Types — License
export type {
    License,
    LicenseVerifyParams,
    LicenseVerifyResult,
    LicensePurchase,
} from "./types/license.js";

// Types — Offer
export type {
    Offer,
    CreateOfferInput,
} from "./types/offer.js";

// Types — Custom Field
export type {
    CustomField,
    CreateCustomFieldInput,
    UpdateCustomFieldInput,
} from "./types/customField.js";

// Types — Common
export type {
    APIErrorResponse,
    APIResponse,
    Paginated,
} from "./types/common.js";
