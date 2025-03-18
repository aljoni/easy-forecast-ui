import React from "react";
import { FaXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type ModalProps = {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    children,
}) => {
    return (
        <div
            className={twMerge(["fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/75", isOpen ? "" : "hidden"])}
        >
            <div className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
                <div className="flex flex-row justify-between mb-6">
                    <h2 className="text-lg font-light text-stone-700">
                        {title}
                    </h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <FaXmark />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};