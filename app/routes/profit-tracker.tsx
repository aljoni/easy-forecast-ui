import React from "react";
import { MetaFunction } from "@remix-run/node";

import { Card, Page } from "~/components";

export const meta: MetaFunction = () => {
    return [{ title: "Profit Tracker" }];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Profit Tracker">
            <Card title="Profit Tracker"></Card>
        </Page>
    );
};

export default Calculators;