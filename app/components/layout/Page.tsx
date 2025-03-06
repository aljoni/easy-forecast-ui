import React from "react";
import Sidebar from "~/components/layout/Sidebar";
import {useLocation} from "react-router";

type PageProps = {
    title?: string;
    children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({children, title}) => {
    const currentPath = useLocation().pathname;

    return (
        <div className="flex flex-row h-screen">
            <Sidebar currentPath={currentPath}/>
            <div className="p-8 flex-1 flex flex-col gap-8 overflow-auto">
                <span className="text-xl transition-page-title">
                    {title}
                </span>
                {children}
            </div>
        </div>
    );
};

export default Page;
export type {PageProps};