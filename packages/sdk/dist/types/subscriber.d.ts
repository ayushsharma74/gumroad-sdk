export interface Subscriber {
    id: string;
    product_id: string;
    product_name: string;
    user_id: string;
    user_email: string;
    purchase_ids: string[];
    created_at: string;
    user_requested_cancellation_at: string | null;
    charge_occurrence_count: number | null;
    recurrence: string;
    cancelled_at: string | null;
    ended_at: string | null;
    failed_at: string | null;
    free_trial_ends_at: string | null;
    license_key: string;
    status: "alive" | "pending_cancellation" | "pending_failure" | "failed_payment" | "fixed_subscription_period_ended" | "cancelled";
}
export interface SubscriberListParams {
    product_id: string;
    email?: string;
}
//# sourceMappingURL=subscriber.d.ts.map