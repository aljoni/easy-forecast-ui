import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { twMerge } from 'tailwind-merge';

// Define notification types
export type NotificationType = "success" | "error" | "info" | "warning";

// Define a type for notifications
export interface Notification {
    id: number;
    message: string;
    type?: NotificationType;
    duration?: number | null;
}

// Define the context type
interface NotificationContextType {
    addNotification: (message: string, type?: NotificationType, duration?: number | null) => void;
    removeNotification: (id: number) => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Hook to use notifications
export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const addNotification = useCallback((message: string, type: NotificationType = "info", duration: number | null = 10000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, duration }]);

        if (duration !== null) {
            const timer = setTimeout(() => {
                removeNotification(id);
            }, duration);

            return () => clearTimeout(timer);  // Clean timeout if component unmounts
        }
    }, [removeNotification]);

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification }}>
            {children}
            <NotificationDisplay notifications={notifications} removeNotification={removeNotification} />
        </NotificationContext.Provider>
    );
};

// Component for displaying notifications
const NotificationDisplay: React.FC<{
    notifications: Notification[],
    removeNotification: (id: number) => void
}> = ({ notifications, removeNotification }) => {

    return (
        <div className="fixed top-5 right-5 flex flex-col gap-2 z-[1000]">
            {notifications.map(({ id, message, type }) => (
                <NotificationItem
                    key={id}
                    id={id}
                    message={message}
                    type={type}
                    removeNotification={removeNotification}
                />
            ))}
        </div>
    );
};

// Component for individual notification item
const NotificationItem: React.FC<{
    id: number,
    message: string,
    type?: NotificationType,
    removeNotification: (id: number) => void
}> = ({
    id,
    message,
    type = "info",
    removeNotification
}) => {
        const typeClasses = {
            success: "bg-[#2C6E49]",
            error: "bg-[#B82E00]",
            warning: "bg-[#DC9404]",
            info: "bg-[#361D2E]"
        };

        return (
            <div className={twMerge("p-4 rounded shadow-md text-white", typeClasses[type])}>
                {message}
                <button className="ml-3 text-white font-bold" onClick={() => removeNotification(id)}>
                    ✖
                </button>
            </div>
        );
    };