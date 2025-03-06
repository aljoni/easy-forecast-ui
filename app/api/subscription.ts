import {performDelete, performPost, performPut} from "~/api/client";
import {ApiSubscriptionResponse} from "~/types/api_responses/ApiSubscriptionResponse";

const sendChargeIdRequest = async (chargeId: string): Promise<void> => {
    console.info("Sending charge id request");

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

const createSubscription = async (tier: string): Promise<ApiSubscriptionResponse> => {
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