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
  FiStar,
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

import { RatingStats } from "@/lib/getDashboard";

interface SidebarProps {
  iconOnly?: boolean;
  stats?: RatingStats | null;
  onMobileClose?: () => void;
}

export default function Sidebar({ iconOnly = false, stats, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const distribution = stats?.rantingDistribution
    ? Object.entries(stats.rantingDistribution).map(([stars, count]) => ({
      stars: Number(stars),
      count,
      percentage: stats.totalRating
        ? Math.round((count / stats.totalRating) * 100)
        : 0,
    }))
    : [];

  const displayStats = stats || {
    averageRating: 0,
    totalRating: 0,
    rantingDistribution: {}
  };


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
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
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
          {!iconOnly && displayStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                p="4"
                mt="4"
                style={{
                  backgroundColor: "var(--gray-a2)",
                  borderRadius: "8px",
                  margin: "16px",
                  marginTop: "auto",
                }}
              >
                {/* Header */}
                <Text size="4" weight="bold" mb="4" as="div">
                  RATING STATISTICS
                </Text>

                {/* Average Rating */}
                <Flex justify="between" align="center" mb="4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Text size="2" weight="medium" color="gray">
                      Average
                    </Text>
                    <Flex align="center" gap="2" mt="1">
                      <Text size="5" weight="bold">
                        {displayStats.averageRating.toFixed(1)}/5
                      </Text>
                      <Flex align="center" gap="1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            size={14}
                            color={
                              star <= Math.round(displayStats.averageRating)
                                ? "#FFD700"
                                : "#E5E7EB"
                            }
                            fill={
                              star <= Math.round(displayStats.averageRating)
                                ? "#FFD700"
                                : "none"
                            }
                          />
                        ))}
                      </Flex>
                    </Flex>
                    <Text size="1" color="gray" mt="1">
                      {displayStats?.totalRating ?? 0} ratings
                    </Text>
                  </motion.div>
                </Flex>

                <Separator size="4" mb="4" />

                {/* Distribution */}
                <Text size="3" weight="bold" mb="3" as="div">
                  DISTRIBUTION
                </Text>

                {distribution
                  .sort((a, b) => Number(b.stars) - Number(a.stars))
                  .map((rating, index) => (
                    <motion.div
                      key={rating.stars}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                    >
                      <Flex align="center" gap="3" mb="2">
                        {/* Label Stars */}
                        <Flex align="center" gap="1" style={{ width: "20px" }}>
                          <Text size="2" weight="medium">
                            {rating.stars}
                          </Text>
                          <FiStar size={12} color="#FFD700" fill="#FFD700" />
                        </Flex>

                        {/* Progress Wrapper */}
                        <Box
                          style={{ flex: 1, position: "relative", height: "6px" }}
                        >
                          <Box
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: "9999px",
                              background: "var(--gray-a5)",
                            }}
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${rating.percentage}%` }}
                            transition={{ duration: 2.0, ease: "easeOut" }}
                            style={{
                              height: "100%",
                              borderRadius: "9999px",
                              background: "#00AEEF",
                            }}
                          />
                        </Box>

                        {/* Percentage */}
                        <Flex gap="2" align="center" style={{ width: "50px" }}>
                          <Text size="2" weight="medium">
                            {rating.percentage}%
                          </Text>
                        </Flex>
                      </Flex>
                    </motion.div>
                  ))}
              </Box>
            </motion.div>
          )}
        </ScrollArea>
      </motion.aside>
    </Theme>
  );
}
