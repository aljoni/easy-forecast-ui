import React from "react";
import { twMerge } from "tailwind-merge";

import { ComponentSize, ComponentVariant } from "~/types";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ComponentVariant;
    size?: ComponentSize;
    icon?: React.ReactNode;
    accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    icon,
    accessibilityLabel
}) => {
    return (
        <button
            className={twMerge([
                "flex items-center justify-center rounded-md border border-transparent px-4 font-medium text-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2",

                size === "xs" && "text-xs h-6",
                size === "sm" && "text-xs h-7",
                size === "md" && "text-sm h-8",
                size === "lg" && "text-base h-10",
                size === "xl" && "text-lg h-12",

                variant === "primary" && "bg-[#361D2E] hover:bg-[#4B2D3C] focus:ring-[#361D2E] text-white",
                variant === "secondary" && "bg-stone-200 hover:bg-stone-300 focus:ring-stone-500 text-stone-900",
                variant === "success" && "bg-[#2C6E49] hover:bg-[#3D7D4A] focus:ring-[#2C6E49] text-white",
                variant === "warning" && "bg-[#DC9404] hover:bg-[#F2A904] focus:ring-[#DC9404] text-white",
                variant === "danger" && "bg-[#B82E00] hover:bg-[#D14900] focus:ring-[#B82E00] text-white",
            ])}
            onClick={onClick}
            aria-label={accessibilityLabel}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export { Button };
