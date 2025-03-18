import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { ComponentSize, ComponentVariant } from "~/types";

interface DropdownProps {
    options: { label: string; value: string }[];
    selected: string;
    onChange: (value: string) => void;
    variant?: ComponentVariant;
    size?: ComponentSize;
    className?: string;
}

// Move style configurations outside component to prevent recreation on each render
const STYLE_CONFIG = {
    colors: {
        primary: "bg-white text-black border-[#361D2E]",
        secondary: "bg-white text-black border-stone-200",
        success: "bg-white text-black border-[#2C6E49]",
        warning: "bg-white text-black border-[#DC9404]",
        danger: "bg-white text-black border-[#B82E00]",
    },
    highlights: {
        primary: "bg-[#D5BACF]",
        secondary: "bg-stone-100",
        success: "bg-[#BFE6D0]",
        warning: "bg-[#FEE7B9]",
        danger: "bg-[#FFC2AD]",
    },
    hoverHighlights: {
        primary: "hover:bg-[#D5BACF]",
        secondary: "hover:bg-stone-100",
        success: "hover:bg-[#BFE6D0]",
        warning: "hover:bg-[#FEE7B9]",
        danger: "hover:bg-[#FFC2AD]",
    },
    sizes: {
        xs: "text-xs px-2 py-1 h-6",
        sm: "text-sm px-2 py-1.5 h-7",
        md: "text-sm px-2 py-2 h-8",
        lg: "text-base px-3 py-2.5 h-10",
        xl: "text-lg px-4 py-2 h-12",
    },
} as const;

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selected,
    onChange,
    variant = "primary",
    size = "md",
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === "ArrowDown") {
                setIsOpen(true);
                setFocusedIndex(0);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                setFocusedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
                break;
            case "Enter":
                if (focusedIndex >= 0) {
                    onChange(options[focusedIndex].value);
                    setIsOpen(false);
                }
                break;
            case "Escape":
            case "Tab":
                setIsOpen(false);
                break;
            default:
                return;
        }
        e.preventDefault();
    }, [isOpen, focusedIndex, options, onChange]);

    const selectedLabel = options.find((opt) => opt.value === selected)?.label || "Select";

    return (
        <div className={twMerge("relative inline-block w-full", className)} ref={dropdownRef}>
            <button
                className={twMerge(
                    "w-full flex justify-between items-center rounded-lg border",
                    STYLE_CONFIG.sizes[size],
                    STYLE_CONFIG.colors[variant]
                )}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
            >
                {selectedLabel}
                <FaChevronDown className="ml-2" />
            </button>

            {isOpen && (
                <ul
                    className={twMerge(
                        "absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden border",
                        STYLE_CONFIG.colors[variant]
                    )}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={selected === option.value}
                        >
                            <button
                                className={twMerge(
                                    "w-full text-left cursor-pointer",
                                    STYLE_CONFIG.sizes[size],
                                    focusedIndex === index ? STYLE_CONFIG.highlights[variant] : "",
                                    STYLE_CONFIG.hoverHighlights[variant]
                                )}
                                onMouseDown={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { Dropdown };