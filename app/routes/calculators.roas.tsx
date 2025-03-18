import React from "react";
import { MetaFunction } from "@remix-run/node";

import {
    Page,
    ROASCalculator,
    NotificationType,

    useNotifications
} from "~/components";

export const meta: MetaFunction = () => {
    return [{ title: "ROAS Calculator" }];
};

const CalculatorsROAS: React.FC = () => {
    const notifications = useNotifications();

    const handleNotify = (message: string, type: NotificationType) => {
        notifications.addNotification(message, type);
    };

    return (
        <Page>
            <ROASCalculator onNotify={handleNotify} />
        </Page>
    );
};

export default CalculatorsROAS;