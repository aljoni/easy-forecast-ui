import React from "react";
import {useLocation} from "react-router";

import {Sidebar} from "~/components";

type PageProps = {
    title?: string;
    children?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({children, title}) => {
    const currentPath = useLocation().pathname;

    return (
        <div className="flex flex-row h-screen pl-80">
            <Sidebar currentPath={currentPath}/>
            <div className="p-8 flex-1 flex flex-col gap-8">
                {title && (
                    <span className="text-xl transition-page-title">
                        {title}
                    </span>
                )}
                {children}
            </div>
        </div>
    );
};

export {Page};
