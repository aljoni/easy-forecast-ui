import {performDelete, performPost, performPut} from "~/api/client";
import {ApiSubscriptionResponse} from "~/types/api/response/ApiSubscriptionResponse";

/**
 * Sends the charge ID to the backend.
 *
 * @param chargeId Charge ID
 */
const sendChargeIdRequest = async (chargeId: string): Promise<void> => {
    const response = await performPut<void>({
        path: "/subscription",
        body: {
            chargeId,
        },
    });

    if (response.responseStatus !== "OK") {
        throw new Error("Failed to send charge id");
    }
};

/**
 * Create a user subscription through the backend.
 *
 * @param tier Subscription tier
 *
 * @returns API response
 */
const createSubscription = async (tier: string): Promise<ApiSubscriptionResponse | null> => {
    const response = await performPost<ApiSubscriptionResponse>({
        path: "/subscription",
        body: {
            tier,
        },
    });

    if (response.responseStatus !== "OK") {
        throw new Error("Failed to subscribe");
    }

    return response.payload;
};

/**
 * Cancels the user subscription through the backend.
 */
const cancelSubscription = async (): Promise<void> => {
    const response = await performDelete<void>({path: "/subscription"});

    if (response.responseStatus !== "OK") {
        throw new Error("Failed to cancel subscription");
    }
};

export {
    sendChargeIdRequest,
    createSubscription,
    cancelSubscription,
};