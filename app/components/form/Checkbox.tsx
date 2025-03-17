import React from "react";

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({label, checked, onChange}) => {
    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span>{label}</span>
        </label>
    );
};

export {Checkbox};