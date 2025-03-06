import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import Card from "~/components/Card";

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