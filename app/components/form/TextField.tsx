import React, {useCallback, useId, useMemo, useState} from "react";
import {twMerge} from "tailwind-merge";

import {ComponentFontStyle, ComponentSize, ComponentVariant} from "~/types";

type TextFieldProps = {
    label?: string;
    value: string;
    disabled?: boolean;
    type?: string;

    autoComplete?: "" | "off" | "on";
    pattern?: string;

    onChange?: (value: string) => void;
    onFocus?: () => void;

    prefix?: string;
    suffix?: string;

    variant?: ComponentVariant;
    size?: ComponentSize;
    fontStyle?: ComponentFontStyle;


    className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 label,
                                                 value,
                                                 type,
                                                 disabled = false,
                                                 autoComplete = "off",
                                                 onChange,
                                                 onFocus,
                                                 prefix,
                                                 suffix,
                                                 variant = "secondary",
                                                 size = "md",
                                                 fontStyle = "sans",
                                                 pattern,
                                                 className,
                                             }) => {
    const inputId = useId();
    const [currentVariant, setCurrentVariant] = useState<ComponentVariant>(variant);

    const patternRegex = useMemo(() => new RegExp(pattern ?? ""), [pattern]);
    const validateInput = useCallback((value: string) => {
        if (value.length !== 0 && pattern && !patternRegex.test(value)) {
            setCurrentVariant("danger");
            return;
        }

        setCurrentVariant(variant);
    }, [pattern]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        validateInput(e.target.value);
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={inputId} className="text-sm font-medium text-stone-800">{label}</label>}
            <div
                className={twMerge([
                    "flex flex-row items-center bg-white border border-stone-200 rounded-lg overflow-clip focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-stone-300",

                    size === "xs" && "text-xs h-6",
                    size === "sm" && "text-sm h-7",
                    size === "md" && "text-sm h-8",
                    size === "lg" && "text-base h-10 px-1",
                    size === "xl" && "text-lg h-12 px-2 border-2",

                    fontStyle === "sans" && "font-sans",
                    fontStyle === "serif" && "font-serif",
                    fontStyle === "mono" && "font-mono",

                    currentVariant === "primary" && "focus-within:ring-[#361D2E] border-[#361D2E]",
                    currentVariant === "secondary" && "focus-within:ring-stone-500 border-stone-200",
                    currentVariant === "success" && "focus-within:ring-[#2C6E49] border-[#2C6E49]",
                    currentVariant === "warning" && "focus-within:ring-[#DC9404] border-[#DC9404]",
                    currentVariant === "danger" && "focus-within:ring-[#B82E00] border-[#B82E00]",

                    disabled && "bg-stone-100 text-stone-600",

                    className,
                ])}
            >
                {prefix && <span className="text-stone-700 pl-2">{prefix}</span>}
                <input
                    type={type}
                    id={inputId}
                    className="border-none bg-inherit px-2 text-inherit text-stone-700 h-full outline-none flex-1 min-w-0"
                    disabled={disabled}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    onFocus={onFocus}
                />
                {suffix && <span className="text-stone-500 pr-2">{suffix}</span>}
            </div>
        </div>
    );
};

export {TextField};
