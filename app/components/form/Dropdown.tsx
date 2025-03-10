import React, {useId} from "react";

type DropdownProps = {
    label?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({label, options, value, onChange}) => {
    const selectId = useId();

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={selectId} className="text-sm font-light text-stone-700">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className="border border-slate-200 rounded-md p-2"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
export type {DropdownProps};