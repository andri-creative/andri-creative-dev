"use client";

import React, { useState } from "react";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Box, ScrollArea } from "@radix-ui/themes";
import Stars from "@/components/Star";
import { useThemeMode } from "@/components/ThemeProvider";
import { useAppData } from "@/app/hooks/useAppData";
import { AppProvider } from "@/app/contexts/AppContext";


export default function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const pathname = usePathname();
  const { mode, accentColor } = useThemeMode();

  // Gunakan custom hook untuk data fetching
  const appData = useAppData();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleIconOnly = () => setIconOnly(!iconOnly);

  const backgroundColor =
    mode === "dark"
      ? `linear-gradient(135deg, var(--${accentColor}-7), var(--${accentColor}-9))`
      : `linear-gradient(135deg, var(--${accentColor}-2), var(--${accentColor}-4))`;

  return (
    <AppProvider value={{
      words: appData.words,
      wordsLoading: appData.wordsLoading,
      skills: appData.skills,
      skillsLoading: appData.skillsLoading,
      achievements: appData.achievements,
      achievementsLoading: appData.achievementsLoading,
      achievementsPagination: appData.achievementsPagination,
      myAlbum: appData.myAlbum,
      myAlbumLoading: appData.myAlbumLoading,
      projects: appData.projects,
      projectsLoading: appData.projectsLoading,
      projectsPagination: appData.projectsPagination,
    }}>
      <Box
        style={{
          minHeight: "100vh",
          display: "flex",
          overflow: "hidden",
          transition: "background-color 0.3s ease",
          backgroundColor,
        }}
      >
        {/* Mobile Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <>
              <motion.div
                key="mobileSidebar"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "256px",
                  zIndex: 50,
                  height: "100vh",
                }}
              >
                <ScrollArea scrollbars="vertical" style={{ height: "100vh" }}>
                  <Sidebar iconOnly={false} />
                </ScrollArea>
              </motion.div>

              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 40,
                }}
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <Box
          display={{ initial: "none", lg: "block" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: iconOnly ? "80px" : "256px",
            zIndex: 20,
            borderRight: "1px solid var(--gray-6)",
          }}
        >
          {/* <ScrollArea scrollbars="vertical" style={{ height: "100%" }}> */}
          <Sidebar iconOnly={iconOnly} stats={appData.ratingStats} />
          {/* </ScrollArea> */}
        </Box>

        {/* Main Content */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            overflow: "hidden",
            position: "relative",
            marginLeft: iconOnly ? "80px" : "256px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* Header */}
          <Box
            style={{
              position: "sticky",
              top: 0,
              zIndex: 30,
              backdropFilter: "blur(0px)",
              backgroundColor: "var(--color-panel)",
              borderBottom: "1px solid var(--gray-6)",
              transition: "backdrop-filter 0.3s ease, background-color 0.3s ease",
            }}
          >
            <Header
              onToggleSidebar={toggleSidebar}
              onToggleIconOnly={toggleIconOnly}
            />
          </Box>

          {/* Content */}
          <Box style={{ flex: 1, overflow: "hidden" }}>
            <ScrollArea scrollbars="vertical" style={{ height: "100%" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ padding: "24px" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          </Box>

          {/* Stars Component */}
          <Box
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: 100,
              pointerEvents: "auto",
            }}
          >
            <Stars />
          </Box>
        </Box>
      </Box>
    </AppProvider >
  );
}