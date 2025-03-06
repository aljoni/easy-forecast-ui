import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import Card from "~/components/Card";

export const meta: MetaFunction = () => {
    return [{title: "Cost Settings"}];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Cost Settings">
            <Card title="Cost Settings"></Card>
        </Page>
    );
};

export default Calculators;