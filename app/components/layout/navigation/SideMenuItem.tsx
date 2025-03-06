import {useNavigate} from "@remix-run/react";
import React, {useCallback, useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import {FaChevronRight} from "react-icons/fa6";

type MenuTileProps = {
    label: string;
    to?: string;
    indented?: boolean;
    currentPath: string;
    expandable?: boolean;
    expanded?: boolean;
    onClick?: () => void;
}

type SideMenuItemInfo = {
    label: string;
    to?: string;
    subItems?: SideMenuItemInfo[];
}

type SideMenuItemProps = {
    label: string;
    to?: string;
    subItems?: SideMenuItemInfo[];
    currentPath: string;
    indented?: boolean;
}

const MenuTile: React.FC<MenuTileProps> = ({
                                               label,
                                               to,
                                               currentPath,
                                               indented = false,
                                               expandable = false,
                                               expanded = false,
                                               onClick
                                           }) => {
    const active = to && to == currentPath;

    return (
        <button
            className={twMerge([
                "border border-transparent flex items-center justify-between p-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#fb731b]/10 hover:text-gray-900 transition-all duration-100",
                active && "bg-[#fb731b] text-white hover:bg-[#fb731b] hover:text-white transition-menu-item-active",
                indented && "ml-12",
                expanded && "bg-[#fb731b]/10",
            ])}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="ml-3 flex-1 text-left">
                    <div className="text-sm font-medium">{label}</div>
                </div>
            </div>
            {expandable && (
                <div className="ml-auto text-black">
                    <FaChevronRight
                        className={twMerge([
                            "transform transition-transform duration-100",
                            expanded && "rotate-90",
                        ])}
                    />
                </div>
            )}
        </button>
    );
};

const SideMenuItem: React.FC<SideMenuItemProps> = ({label, to, currentPath, subItems = [], indented = false}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const isExpanded = localStorage.getItem(`menu_item.${label}.is_open`) === "true";
        setExpanded(isExpanded);
    }, [label]);

    const handleToggle = useCallback(() => {
        if (subItems.length > 0) {
            const newExpandedState = !expanded;
            setExpanded(newExpandedState);
            localStorage.setItem(`menu_item.${label}.is_open`, String(newExpandedState));
        }
        if (to) {
            navigate(to, {viewTransition: true});
        }
    }, [expanded, label, to, navigate, subItems]);

    return (
        <>
            <MenuTile
                label={label}
                to={to}
                currentPath={currentPath}
                indented={indented}
                onClick={handleToggle}
                expandable={subItems.length > 0}
                expanded={expanded}
            />
            {(subItems.length > 0) && (
                <div
                    className={twMerge([
                        "overflow-hidden transition-all duration-200 flex flex-col gap-2 mt-1",
                        expanded && "h-fit",
                        !expanded && "h-0",
                    ])}
                >
                    {subItems.map((item) => (
                        <SideMenuItem key={item.to} {...item} currentPath={currentPath} indented/>
                    ))}
                </div>
            )}
        </>
    )
        ;
}

export {SideMenuItem};
export type {SideMenuItemInfo, SideMenuItemProps};