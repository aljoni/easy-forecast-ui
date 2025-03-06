import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import Card from "~/components/Card";

export const meta: MetaFunction = () => {
    return [{title: "Profit Tracker"}];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Profit Tracker">
            <Card title="Profit Tracker"></Card>
        </Page>
    );
};

export default Calculators;