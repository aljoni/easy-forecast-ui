import React from "react";
import {MetaFunction} from "@remix-run/node";

import {CostSettingCard, Page} from "~/components";

export const meta: MetaFunction = () => {
    return [{title: "Cost Settings"}];
};

const Calculators: React.FC = () => {
    return (
        <Page title="Cost Settings">
            <CostSettingCard type="fixed"/>
            <CostSettingCard type="variable"/>
        </Page>
    );
};

export default Calculators;