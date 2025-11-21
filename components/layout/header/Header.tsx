"use client";

import IconSearch from "./icon-search";
import ToggleDarkMode from "@/components/TogelDarkMode";
import Settings from "./Settings";
import { IconButton, Flex, Box } from "@radix-ui/themes";
import { TextAlignJustifyIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  onToggleSidebar?: () => void;
  onToggleIconOnly?: () => void;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
  iconOnly?: boolean;
}

export default function Header({
  onToggleSidebar,
  onToggleIconOnly,
  // isMobile,
  // isSidebarOpen,
  iconOnly,
}: HeaderProps) {
  // const [isIconOnly, setIsIconOnly] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth < 1024) {
      onToggleSidebar?.();
    } else {
      onToggleIconOnly?.();
    }
  };


  return (
    <Box
      // as="header"
      style={{
        backgroundColor: "var(--color-panel-solid)",
        borderBottom: "1px solid var(--gray-a5)",
        width: "100%",
      }}
    >
      <Flex
        align="center"
        justify="between"
        px="4"
        py="3"
        style={{
          maxWidth: "100%",
        }}
      >
        {/* 🔹 Toggle Sidebar */}
        <IconButton
          size="3"
          variant="ghost"
          onClick={handleToggle}
          radius="full"
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            cursor: "pointer",
            position: "relative",
            width: "40px",
            height: "40px",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {iconOnly ? (
              <motion.div
                key="left"
                initial={{ rotate: -90, opacity: 0, y: -10 }}
                animate={{ rotate: 0, opacity: 1, y: 0 }}
                exit={{ rotate: 90, opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                style={{ position: "absolute" }}
              >
                <TextAlignLeftIcon width="22" height="22" />
              </motion.div>
            ) : (
              <motion.div
                key="justify"
                initial={{ rotate: 90, opacity: 0, y: 10 }}
                animate={{ rotate: 0, opacity: 1, y: 0 }}
                exit={{ rotate: -90, opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ position: "absolute" }}
              >
                <TextAlignJustifyIcon width="22" height="22" />
              </motion.div>
            )}
          </AnimatePresence>
        </IconButton>

        {/* 🔹 Right Section */}
        <Flex align="center" gap="3">
          <IconSearch />
          <ToggleDarkMode />
          <Settings />
        </Flex>
      </Flex>
    </Box>
  );
}
