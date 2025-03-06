import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
    return [{title: "Unit Economic Calculator"}];
};

const CalculatorsUnitEconomic: React.FC = () => {
    return (
        <Page title="Unit Economic Calculator">
            <p>placeholder</p>
        </Page>
    );
};

export default CalculatorsUnitEconomic;