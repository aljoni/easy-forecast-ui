import React from "react";
import {twMerge} from "tailwind-merge";

type CardProps = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({title, children, className}) => {
    return (
        <div className={twMerge(["rounded-lg bg-white", className])}>
            <div className="flex flex-col gap-4 p-6">
                {title && (
                    <div className="text-xl font-light text-stone-800">
                        {title}
                    </div>
                )}
                {children && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
export type {CardProps};