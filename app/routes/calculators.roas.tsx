import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import ROASCalculator from "~/components/calculator/ROASCalculator";
import {NotificationType, useNotifications} from "~/components/NotificationProvider";

export const meta: MetaFunction = () => {
    return [{title: "ROAS Calculator"}];
};

const CalculatorsROAS: React.FC = () => {
    const notifications = useNotifications();

    const handleNotify = (message: string, type: NotificationType) => {
        notifications.addNotification(message, type);
    };

    return (
        <Page>
            <ROASCalculator onNotify={handleNotify}/>
        </Page>
    );
};

export default CalculatorsROAS;