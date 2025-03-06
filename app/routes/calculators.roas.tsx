import Page from "~/components/layout/Page";
import {MetaFunction} from "@remix-run/node";
import React from "react";
import ROASCalculator from "~/components/calculator/ROASCalculator";

export const meta: MetaFunction = () => {
    return [{title: "ROAS Calculator"}];
};

const CalculatorsROAS: React.FC = () => {
    return (
        <Page>
            <ROASCalculator/>
        </Page>
    );
};

export default CalculatorsROAS;