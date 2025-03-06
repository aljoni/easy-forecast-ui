import React from "react";

type CalculatorResultRowProps = {
  label: string;
  value: string;
};

const CalculatorResultRow: React.FC<CalculatorResultRowProps> = ({ label, value }) => {
  return (
    <tr className="border-b border-slate-200 last-of-type:border-0 h-8">
      <td className="font-bold text-sm px-2 w-[75%]">{label}</td>
      <td className="text-sm">{value}</td>
    </tr>
  );
};

export default CalculatorResultRow;
