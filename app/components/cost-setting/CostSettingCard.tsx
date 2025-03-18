import React, { useCallback, useState } from "react";

import { CostSettingCategoryType, CostSettingType } from "~/types";
import { Card, CostSettingCategory, DateField, Dropdown, TextField } from "~/components";

type CostSettingCardProps = {
    type: CostSettingType;
}

const titleMap: Record<CostSettingType, string> = {
    fixed: "Fixed Costs",
    variable: "Variable Costs",
};

const CostsHeader: React.FC<{ type: CostSettingType }> = ({ type }): React.ReactNode => {
    const rowClassName = "text-sm text-stone-600";
    const thClassName = "text-left font-medium px-1 py-2";

    switch (type) {
        case "fixed":
            return (
                <tr className={rowClassName}>
                    <th className={thClassName}>Category</th>
                    <th className={thClassName}>Cost</th>
                    <th className={thClassName} colSpan={2}>Date Range</th>
                    <th className={thClassName}>Recurring</th>
                </tr>
            );
        case "variable":
            return (
                <tr className={rowClassName}>
                    <th className={thClassName}>Category</th>
                    <th className={thClassName}>Cost</th>
                    <th className={thClassName} colSpan={2}>Date Range</th>
                    <th className={thClassName}>Percent Of</th>
                </tr>
            );
    }
};



const VariableCostRow: React.FC = () => {
    return (
        <tr>
            <td>
                <CostSettingCategory
                    onChange={(value) => console.log(value)}
                />
            </td>
            <td>
                <TextField
                    prefix="£"
                    autoComplete="off"
                    value=""
                    inputSize="sm"
                />
            </td>
            <td colSpan={2}>
                <DateField
                    startDate={new Date()}
                    endDate={new Date()}
                    onChange={(startDate, endDate) => {
                        console.log(startDate, endDate);
                    }}
                    inputSize="sm"
                />
            </td>
            <td>
                <div className="flex flex-row gap-2 items-center">
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-16"
                        suffix="%"
                        inputSize="sm"
                    />
                    <span className="text-sm font-medium text-stone-500">of</span>
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-28"
                        inputSize="sm"
                    />
                </div>
            </td>
        </tr>
    );
};

const CostSettingCard: React.FC<CostSettingCardProps> = ({ type }) => {
    return (
        <Card title={titleMap[type]} className="mx-auto">
            <table>
                <thead>
                    <CostsHeader type={type} />
                </thead>
                <tbody>
                    {type === "fixed" && <FixedCostRow />}
                    {type === "fixed" && <FixedCostRow />}
                    {type === "fixed" && <FixedCostRow />}
                    {type === "variable" && <VariableCostRow />}
                </tbody>
            </table>
        </Card>
    );
};

export { CostSettingCard };

