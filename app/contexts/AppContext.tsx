"use client";

import React, { createContext, useContext } from "react";
import type { AllDashboardData } from "@/lib/gelAllDashboard";

interface AppContextProps {
    data: AllDashboardData | null;
    loading: boolean;
}

// Context boleh undefined → supaya TypeScript mengikuti value Provider
const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: AppContextProps;
}) {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }

    return context;
}
