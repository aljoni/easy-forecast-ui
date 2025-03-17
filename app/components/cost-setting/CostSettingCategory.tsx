import React from "react";

import {Dropdown} from "~/components";
import {CostSettingCategoryType} from "~/types";

type CostSettingCategoryProps = {
    selected?: string;
    onChange: (value: string) => void;
};

const costSettingCategories: Record<CostSettingCategoryType, string> = {
    uncategorized: "Uncategorized",
    ad_spend: "Ad Spend",
    other: "Other",
};

const CostSettingCategory: React.FC<CostSettingCategoryProps> = ({selected, onChange}) => {
    return (
        <Dropdown
            options={
                Object
                    .entries(costSettingCategories)
                    .map(([value, label]) => ({label, value}))
            }
            selected={selected ?? "uncategorized"}
            onChange={onChange}
            variant="secondary"
            size="sm"
        />
    );
};

export {CostSettingCategory};
