import React from "react";
import { MetaFunction } from "@remix-run/node";

import { Page, UnitEconomicCalculator, NotificationType, useNotifications } from "~/components";

export const meta: MetaFunction = () => {
    return [{ title: "Unit Economic Calculator" }];
};

const CalculatorsUnitEconomic: React.FC = () => {
    const notifications = useNotifications();

    const handleNotify = (message: string, type: NotificationType) => {
        notifications.addNotification(message, type);
    };

    return (
        <Page>
            <UnitEconomicCalculator onNotify={handleNotify} />
        </Page>
    );
};

export default CalculatorsUnitEconomic;