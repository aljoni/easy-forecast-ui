import {SideMenuItem, SideMenuItemInfo} from "~/components/layout/navigation/SideMenuItem";
import React from "react";

type SideMenuProps = {
    items: SideMenuItemInfo[];
    currentPath: string;
}

const SideMenu: React.FC<SideMenuProps> = ({items, currentPath}) => {

    return (
        <div className="flex flex-col w-full gap-2 p-4">
            {items.map((item, index) => (
                <SideMenuItem key={index} {...item} currentPath={currentPath}/>
            ))}
        </div>
    );
}

export default SideMenu;
export type {SideMenuProps};