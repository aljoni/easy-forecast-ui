import React from "react";

import {CostSettingType} from "~/types";
import {Card, CostSettingCategory, TextField} from "~/components";

type CostSettingCardProps = {
    type: CostSettingType;
}

const titleMap: Record<CostSettingType, string> = {
    fixed: "Fixed Costs",
    variable: "Variable Costs",
};

const buildHeader = (type: CostSettingType): React.ReactNode => {
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

const buildFixedRow = (): React.ReactNode => {
    const tdClassName = "p-1";

    return (
        <tr className="h-8">
            <td className={tdClassName}>
                <CostSettingCategory
                    onChange={(value) => console.log(value)}
                />
            </td>
            <td className={tdClassName}>
                <TextField
                    size="sm"
                    prefix="£"
                    autoComplete="off"
                    value=""
                />
            </td>
            <td className={tdClassName}colSpan={2}>
                <input type="date"/>
            </td>
            <td className={tdClassName}>
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-medium text-stone-500">Every</span>
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-12"
                        size="sm"
                    />
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-28"
                        size="sm"
                    />
                </div>
            </td>
        </tr>
    );
};

const buildVariableRow = (): React.ReactNode => {
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
                    size="sm"
                />
            </td>
            <td colSpan={2}>
                <input type="date"/>
            </td>
            <td>
                <div className="flex flex-row gap-2 items-center">
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-16"
                        suffix="%"
                        size="sm"
                    />
                    <span className="text-sm font-medium text-stone-500">of</span>
                    <TextField
                        autoComplete="off"
                        value=""
                        className="w-28"
                        size="sm"
                    />
                </div>
            </td>
        </tr>
    );
};

const CostSettingCard: React.FC<CostSettingCardProps> = ({type}) => {
    return (
        <Card title={titleMap[type]} className="mx-auto">
            <table>
                <thead>
                {buildHeader(type)}
                </thead>
                <tbody>
                {type === "fixed" && buildFixedRow()}
                {type === "fixed" && buildFixedRow()}
                {type === "fixed" && buildFixedRow()}
                {type === "variable" && buildVariableRow()}
                </tbody>
            </table>
        </Card>
    );
};

export {CostSettingCard};

