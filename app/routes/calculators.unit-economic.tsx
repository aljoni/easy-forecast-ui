import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import {NotificationType, useNotifications} from "~/components/NotificationProvider";
import UnitEconomicCalculator from "~/components/calculator/UnitEconomicCalculator";

export const meta: MetaFunction = () => {
    return [{title: "Unit Economic Calculator"}];
};

const CalculatorsUnitEconomic: React.FC = () => {
    const notifications = useNotifications();

    const handleNotify = (message: string, type: NotificationType) => {
        notifications.addNotification(message, type);
    };

    return (
        <Page>
            <UnitEconomicCalculator onNotify={handleNotify}/>
        </Page>
    );
};

export default CalculatorsUnitEconomic;