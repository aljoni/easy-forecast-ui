import React from "react";
import { MetaFunction } from "@remix-run/node";

import { Page, Card } from "~/components";

export const meta: MetaFunction = () => {
    return [{ title: "Integrations" }];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Integrations">
            <Card title="Integrations"></Card>
        </Page>
    );
};

export default Calculators;