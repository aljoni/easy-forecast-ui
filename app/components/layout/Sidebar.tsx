import React from "react";
import { SideMenu } from "~/components";

type SidebarProps = {
    currentPath: string;
};

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
    return (
        <div className="flex flex-col w-80 bg-white h-screen select-none fixed top-0 left-0 z-10">
            <div className="flex flex-row justify-center pt-4 pb-1">
                <img src="/logo.png" alt="logo" className="w-16 h-16" />
            </div>
            <SideMenu
                items={[
                    { label: "Home", to: "/" },
                    { label: "Orders", to: "/orders" },
                    { label: "Profit Tracker", to: "/profit-tracker" },
                    { label: "KPI", to: "/kpi" },
                    {
                        label: "Calculators",
                        subItems: [
                            { label: "Unit Economic Calculator", to: "/calculators/unit-economic" },
                            { label: "ROAS Calculator", to: "/calculators/roas" },
                        ]
                    },
                    { label: "Cost Settings", to: "/cost-settings" },
                    { label: "Integrations", to: "/integrations" },
                ]}
                currentPath={currentPath}
            />
        </div>
    )
};

export { Sidebar };
