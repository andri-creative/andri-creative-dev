"use client";

import { IconButton } from "@radix-ui/themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeMode } from "./ThemeProvider";

export default function ToggleDarkMode() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      size="3"
      variant="soft"
      radius="full"
      onClick={toggleMode}
      aria-label="Toggle dark mode"
      className="relative overflow-hidden w-9 h-9"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mode === "light" ? (
          <motion.div
            key="moon"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <MoonIcon width="18" height="18" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <SunIcon width="18" height="18" />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
