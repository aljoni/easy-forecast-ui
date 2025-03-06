import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import Card from "~/components/Card";

export const meta: MetaFunction = () => {
    return [{title: "Orders"}];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Orders">
            <Card title="Orders"></Card>
        </Page>
    );
};

export default Calculators;