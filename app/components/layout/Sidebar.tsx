import React from "react";
import SideMenu from "~/components/layout/navigation/SideMenu";

type SidebarProps = {
    currentPath: string;
};

const Sidebar: React.FC<SidebarProps> = ({currentPath}) => {
    return (
        <div className="flex flex-col w-80 bg-white h-screen select-none">
            <div className="flex flex-row justify-center pt-4 pb-1">
                <img src="/logo.png" alt="logo" className="w-16 h-16"/>
            </div>
            <SideMenu
                items={[
                    {label: "Home", to: "/"},
                    {label: "Orders", to: "/orders"},
                    {label: "Profit Tracker", to: "/profit-tracker"},
                    {label: "KPI", to: "/kpi"},
                    {
                        label: "Calculators",
                        subItems: [
                            {label: "Unit Economic Calculator", to: "/calculators/unit-economic"},
                            {label: "ROAS Calculator", to: "/calculators/roas"},
                        ]
                    },
                    {label: "Cost Settings", to: "/cost-settings"},
                    {label: "Integrations", to: "/integrations"},
                ]}
                currentPath={currentPath}
            />
        </div>
    )
};

export default Sidebar;
export type {SidebarProps};