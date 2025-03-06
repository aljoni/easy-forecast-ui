import React from "react";
import {twMerge} from "tailwind-merge";
import {ElementSize, ElementVariant} from "~/types/ElementInfo";

type TextFieldProps = {
    label?: string;
    value: string;
    disabled?: boolean;
    autoComplete?: "" | "off" | "on";
    onChange: (value: string) => void;
    prefix?: string;
    suffix?: string;
    variant?: ElementVariant;
    size?: ElementSize;
    className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 label,
                                                 value,
                                                 disabled = false,
                                                 autoComplete = "off",
                                                 onChange,
                                                 prefix,
                                                 suffix,
                                                 variant = "secondary",
                                                 size = "md",
                                                 className,
                                             }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-stone-800">{label}</label>}
            <div
                className={twMerge([
                    "flex flex-row items-center bg-white border border-stone-200 rounded-lg overflow-clip h-8 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-stone-300",

                    size === "xs" && "text-xs h-6",
                    size === "sm" && "text-xs h-7",
                    size === "md" && "text-sm",
                    size === "lg" && "text-base h-10 px-1",
                    size === "xl" && "text-lg h-12 px-2 border-2",

                    variant === "primary" && "focus-within:ring-[#361D2E] border-[#361D2E]",
                    variant === "secondary" && "focus-within:ring-stone-500 border-stone-200",
                    variant === "success" && "focus-within:ring-[#2C6E49] border-[#2C6E49]",
                    variant === "warning" && "focus-within:ring-[#DC9404] border-[#DC9404]",
                    variant === "danger" && "focus-within:ring-[#B82E00] border-[#B82E00]",

                    disabled && "bg-stone-100 text-stone-600",

                    className,
                ])}
            >
                {prefix && <span className="text-stone-700 pl-2">{prefix}</span>}
                <input
                    type="text"
                    className="border-none bg-inherit px-2 text-inherit text-stone-700 h-full outline-none flex-1 min-w-0"
                    disabled={disabled}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {suffix && <span className="text-stone-500 pr-2">{suffix}</span>}
            </div>
        </div>
    );
};

export default TextField;
export type {TextFieldProps};