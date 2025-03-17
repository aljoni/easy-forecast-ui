import React from "react";
import {MetaFunction} from "@remix-run/node";

import {Page} from "~/components";

export const meta: MetaFunction = () => {
    return [{title: "Cost Settings"}];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Cost Settings">
        </Page>
    );
};

export default Calculators;