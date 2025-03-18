import React from "react";

type CalculatorResultRowProps = {
    label: string;
    value: string;
};

const CalculatorResultRow: React.FC<CalculatorResultRowProps> = ({ label, value }) => {
    return (
        <tr className="border-b border-slate-200 last-of-type:border-0 h-9">
            <td className="font-bold text-sm text-right font-light px-3 w-[75%]">{label}:</td>
            <td className="text-sm font-mono">{value}</td>
        </tr>
    );
};

export { CalculatorResultRow };
