import React from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "~/components";
import { ComponentVariant } from "~/types";

type CardProps = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
    actions?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
        variant?: ComponentVariant;
    }[];
}

const Card: React.FC<CardProps> = ({ title, children, className, actions }) => {
    return (
        <div className={twMerge(["rounded-lg bg-white", className])}>
            <div className="flex flex-col gap-6 p-6">
                {title && (
                    <div className="flex flex-row">
                        <span className="text-lg font-medium text-stone-700 flex-grow">
                            {title}
                        </span>
                        {actions && (
                            <div className="flex flex-row gap-2">
                                {actions.map((action) => (
                                    <Button
                                        key={action.label}
                                        variant={action.variant ?? "secondary"}
                                        size="sm"
                                        onClick={action.onClick}
                                        icon={action.icon}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </div>
                        )}
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

export { Card };
