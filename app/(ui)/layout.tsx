"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Box, ScrollArea } from "@radix-ui/themes";
import Stars from "@/components/Star";
import { useThemeMode } from "@/components/ThemeProvider";
import type { RatingResponse } from "@/app/services/ratingService"

export default function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { mode, accentColor } = useThemeMode();


  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    console.log("Toggle sidebar clicked");
    setSidebarOpen(!sidebarOpen);
  };

  const toggleIconOnly = () => {
    if (!isMobile) {
      setIconOnly(!iconOnly);
    }
  };

  const handleRefreshRating = (newStats?: RatingResponse) => {
    console.log("🔄 Rating submitted with stats:", newStats);
  }

  const backgroundColor =
    mode === "dark"
      ? `linear-gradient(135deg, var(--${accentColor}-7), var(--${accentColor}-9))`
      : `linear-gradient(135deg, var(--${accentColor}-2), var(--${accentColor}-4))`;

  return (
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
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <>
            <motion.div
              key="mobileSidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "280px",
                zIndex: 60,
                height: "100vh",
                backgroundColor: "var(--color-panel-solid)",
                borderRight: "1px solid var(--gray-6)",
              }}
            >
              <ScrollArea scrollbars="vertical" style={{ height: "100vh" }}>
                <Sidebar
                  iconOnly={false}
                  onMobileClose={() => setSidebarOpen(false)}
                />
              </ScrollArea>
            </motion.div>

            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 50,
              }}
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: iconOnly ? "80px" : "256px",
            zIndex: 20,
            borderRight: "1px solid var(--gray-6)",
            backgroundColor: "var(--color-panel-solid)",
          }}
        >
          <Sidebar iconOnly={iconOnly} />
        </Box>
      )}

      {/* Main Content */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          // Responsive margin left
          marginLeft: isMobile ? "0px" : (iconOnly ? "80px" : "256px"),
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            backdropFilter: "blur(10px)",
            backgroundColor: "var(--color-panel)",
            borderBottom: "1px solid var(--gray-6)",
          }}
        >
          <Header
            onToggleSidebar={toggleSidebar}
            onToggleIconOnly={toggleIconOnly}
            isMobile={isMobile}
            isSidebarOpen={sidebarOpen}
            iconOnly={iconOnly}
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
          }}
        >
          <Stars refreshRating={handleRefreshRating} />
        </Box>
      </Box>
    </Box>
  );
}