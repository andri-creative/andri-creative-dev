"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { WordItem } from "@/lib/words";
import type { SkillItem } from "@/lib/skills";
import type { AchievementStats, AlbumStats, ProjectStats } from "@/lib/getDashboard";

interface AppProviderProps {
    words: WordItem[];
    wordsLoading: boolean;
    skills: SkillItem[];
    skillsLoading: boolean;
    achievements: AchievementStats[];
    achievementsLoading: boolean;
    achievementsPagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
    myAlbum: AlbumStats[];
    myAlbumLoading: boolean;
    projects: ProjectStats[];
    projectsLoading: boolean;
    projectsPagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
}

const AppContext = createContext<AppProviderProps>({
    words: [],
    wordsLoading: true,
    skills: [],
    skillsLoading: true,
    achievements: [],
    achievementsLoading: true,
    achievementsPagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    },
    myAlbum: [],
    myAlbumLoading: true,
    projects: [],
    projectsLoading: true,
    projectsPagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    },
});

interface AppProviderComponentProps {
    children: ReactNode;
    value: AppProviderProps;
}

export function AppProvider({ children, value }: AppProviderComponentProps) {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}