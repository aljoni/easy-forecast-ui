import React from "react";
import { MetaFunction } from "@remix-run/node";

import { Card, Page } from "~/components";

export const meta: MetaFunction = () => {
    return [{ title: "Orders" }];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Orders">
            <Card title="Orders"></Card>
        </Page>
    );
};

export default Calculators;