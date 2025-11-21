// "use client";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Theme,
  Separator,
  ScrollArea
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import {
  FiHome,
  FiInfo,
  FiAward,
  FiGrid,
  FiFolder,
  FiBox,
  FiUsers,
  FiMessageSquare,
  FiImage,
  FiPhone,
} from "react-icons/fi";

import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./user";

const menuItems = [
  {
    name: "Home",
    href: "/home",
    icon: <FiHome size={18} />,
  },
  {
    name: "About",
    href: "/about",
    icon: <FiInfo size={18} />,
  },
  {
    name: "Achievements",
    href: "/achievements",
    icon: <FiAward size={18} />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FiGrid size={18} />,
  },
  {
    name: "Project",
    href: "/project",
    icon: <FiFolder size={18} />,
  },
  {
    name: "Product",
    href: "/product",
    icon: <FiBox size={18} />,
  },
  {
    name: "Team",
    href: "/team",
    icon: <FiUsers size={18} />,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: <FiMessageSquare size={18} />,
  },
  {
    name: "Album",
    href: "/album",
    icon: <FiImage size={18} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <FiPhone size={18} />,
  },
];

import ResultRating from "@/components/resultRating";

interface SidebarProps {
  iconOnly?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ iconOnly = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();




  return (
    <Theme>
      <motion.aside
        animate={{ width: iconOnly ? 72 : 260 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          backgroundColor: "var(--color-panel-solid)",
          borderRight: "1px solid var(--gray-a5)",
          height: "100vh",
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          // overflow: "auto",
        }}
      >
        <Box p="4">
          {iconOnly ? (
            <Flex justify="center">
              <Avatar
                size="3"
                radius="full"
                src="/profile/02.webp"
                fallback="A"
              />
            </Flex>
          ) : (
            <User />
          )}
        </Box>

        <Separator size="4" />
        <ScrollArea type="always" scrollbars="vertical" style={{ height: "100%" }}>
          <Box mt="4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Box key={item.name} mb="1">
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onMobileClose) onMobileClose();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: iconOnly ? 0 : "10px",
                      justifyContent: iconOnly ? "center" : "flex-start",
                      padding: iconOnly ? "10px" : "8px 16px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: isActive ? "var(--accent-12)" : "var(--gray-11)",
                      backgroundColor: isActive
                        ? "var(--accent-a3)"
                        : "transparent",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <Box
                      style={{
                        color: isActive ? "var(--accent-11)" : "var(--gray-10)",
                      }}
                    >
                      {item.icon}
                    </Box>
                    {!iconOnly && (
                      <Text size="3" weight={isActive ? "bold" : "regular"}>
                        {item.name}
                      </Text>
                    )}
                  </Link>
                </Box>
              );
            })}
          </Box>
          {/* Re */}
          {!iconOnly && <ResultRating />}
        </ScrollArea>
      </motion.aside>
    </Theme>
  );
}
