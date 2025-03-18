import React, { useCallback, useState } from "react";
import { CostSettingCategoryType } from "~/types";
import { CostSettingCategory, DateField, Dropdown, TextField } from "~/components";

const FixedCostRow: React.FC = () => {
    const [category, setCategory] = useState<CostSettingCategoryType>("uncategorized");
    const [cost, setCost] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [interval, setInterval] = useState<string>("");
    const [period, setPeriod] = useState<string>("days");

    const tdClassName = "p-1 px-2";

    return (
        <tr className="h-8">
            <td className={tdClassName}>
                <CostSettingCategory
                    selected={category}
                    onChange={setCategory}
                />
            </td>
            <td className={tdClassName}>
                <TextField
                    inputSize="sm"
                    prefix="£"
                    autoComplete="off"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-24"
                    pattern="[0-9]*(\.[0-9]{,3})?"
                />
            </td>
            <td className={tdClassName} colSpan={2}>
                <DateField
                    startDate={startDate}
                    endDate={endDate}
                    onChange={useCallback((startDate?: Date, endDate?: Date) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }, [])}
                    inputSize="sm"
                />
            </td>
            <td className={tdClassName}>
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-medium text-stone-500">Every</span>
                    <TextField
                        autoComplete="off"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        className="w-12"
                        inputSize="sm"
                    />
                    <Dropdown
                        variant="secondary"
                        size="sm"
                        options={[
                            { value: "days", label: "Days" },
                            { value: "weeks", label: "Weeks" },
                            { value: "months", label: "Months" },
                            { value: "years", label: "Years" },
                        ]}
                        selected={period}
                        onChange={setPeriod}
                        className="w-24"
                    />
                </div>
            </td>
        </tr>
    );
};

export { FixedCostRow };