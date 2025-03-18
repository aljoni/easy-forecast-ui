import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Checkbox, TextField } from "~/components";
import { ComponentSize } from "~/types";
import { DateRange, DayPicker, Mode } from "react-day-picker";
import "react-day-picker/style.css";

type DateFieldProps = {
    startDate?: Date;
    endDate?: Date;
    onChange?: (startDate?: Date, endDate?: Date) => void;
    inputSize?: ComponentSize;
    className?: string;
}

const usePreviewString = (selectedRange: DateRange | Date, mode: Mode) => {
    return useMemo(() => {
        if (mode === "single") {
            return getPreviewString(selectedRange as Date);
        }
        const { from, to } = selectedRange as DateRange;
        return getPreviewString(from, to);
    }, [selectedRange, mode]);
};

const getPreviewString = (startDate?: Date, endDate?: Date) => {
    return [startDate, endDate].filter(Boolean).map(date => date?.toLocaleDateString()).join(' - ');
};

const DateField: React.FC<DateFieldProps> = ({
    startDate,
    endDate,
    onChange,
    className,
    inputSize = "md"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const [pickerOpen, setPickerOpen] = useState(false);
    const [pickerMode, setPickerMode] = useState<Mode>("range");
    const [selectedDateOrRange, setSelectedDateOrRange] = useState<DateRange | Date>({
        from: startDate ?? new Date(),
        to: endDate ?? new Date(),
    });

    const previewString = usePreviewString(selectedDateOrRange, pickerMode);
    const pickerRef = useRef<HTMLDivElement | null>(null);
    const textFieldRef = useRef<HTMLDivElement | null>(null);

    const togglePicker = useCallback(() => setPickerOpen(prev => !prev), []);

    const togglePickerMode = useCallback(() => {
        const newMode = pickerMode === "range" ? "single" : "range";
        if (newMode === "single") {
            const fromDate = (selectedDateOrRange as DateRange).from ?? new Date();
            setSelectedDateOrRange(fromDate);
        } else {
            const fromDate = selectedDateOrRange instanceof Date ? selectedDateOrRange : (selectedDateOrRange as DateRange).from;
            setSelectedDateOrRange({ from: fromDate, to: (selectedDateOrRange as DateRange).to ?? fromDate });
        }
        setPickerMode(newMode);
    }, [pickerMode, selectedDateOrRange]);

    const handleSelect = useCallback((newSelection: DateRange | Date) => {
        if (pickerMode === "single") {
            const date = newSelection as Date;
            setSelectedDateOrRange(date);
            onChange?.(date, undefined);
        } else {
            const range = newSelection instanceof Date ? { from: newSelection, to: undefined } : newSelection;
            setSelectedDateOrRange(range);
            onChange?.(range.from, range.to);
        }
    }, [pickerMode, onChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                textFieldRef.current &&
                !textFieldRef.current.contains(event.target as Node)
            ) {
                setPickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [pickerRef, textFieldRef]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div ref={textFieldRef}>
                <TextField
                    value={previewString}
                    inputSize={inputSize}
                    onClick={togglePicker}
                    className={twMerge([
                        "w-52 text-center",
                        className,
                    ])}
                    readOnly
                />
            </div>
            <div
                ref={pickerRef}
                className={twMerge([
                    "p-4 shadow-md rounded-lg absolute bg-white border border-stone-100",
                    pickerOpen ? "block" : "hidden",
                    inputSize === "xs" && "mt-8",
                    inputSize === "sm" && "mt-9",
                    inputSize === "md" && "mt-10",
                    inputSize === "lg" && "mt-12",
                    inputSize === "xl" && "mt-14",
                ])}
            >
                <div className="flex flex-row justify-between border-b border-stone-200 pb-3">
                    <Checkbox
                        label={"Has End Date"}
                        checked={pickerMode === "range"}
                        onChange={togglePickerMode}
                    />
                </div>
                {isLoaded && (
                    <DayPicker
                        animate
                        mode={pickerMode as "range"}
                        selected={selectedDateOrRange as DateRange}
                        onSelect={handleSelect}
                        showOutsideDays
                        required
                        endMonth={new Date(new Date().getFullYear() + 50, 0)}
                        captionLayout="dropdown"
                    />
                )}
            </div>
        </div>
    );
};

export { DateField };