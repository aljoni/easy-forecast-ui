import React from "react";
import {MetaFunction} from "@remix-run/node";

import {Card, Page} from "~/components";

export const meta: MetaFunction = () => {
    return [{title: "KPI"}];
};

const KPI: React.FC = () => {
    return (
        <Page title="KPI">
            <Card title="KPI"></Card>
        </Page>
    );
};

export default KPI;