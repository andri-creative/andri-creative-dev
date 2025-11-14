"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Heading,
  Flex,
  Box,
  Grid,
  Badge,
  Button,
  Avatar,
} from "@radix-ui/themes";
import { useThemeMode } from "@/components/ThemeProvider";
import Image from "next/image";
import { motion } from "framer-motion";

import { TbPinned, TbExternalLink } from "react-icons/tb";
import Link from "next/link";

const project = [
  {
    id: 1,
    name: "Presence Internal System Update",
    role: "Fullstack Developer",
    status: true, // Aktif
    pinned: true,
    image: "/1.png",
    technologies: ["/skills/01.png"],
    features: ["Real-time dashboard", "Smart attendance tracking", "Report generation"],
    repository: "https://github.com/username/presence-system",
    liveDemo: "https://presence-system.demo.com",
    lastUpdated: "2025-01-10" // Baru diupdate
  },
  {
    id: 2,
    name: "E-Commerce Mobile App",
    role: "Frontend Developer",
    status: false, // Completed = false
    pinned: false,
    image: "/2.png",
    technologies: ["/skills/02.png"],
    features: ["Product catalog", "Shopping cart", "Payment integration"],
    repository: "https://github.com/username/ecommerce-app",
    liveDemo: "https://ecommerce-app.demo.com",
    lastUpdated: "2024-12-20" // Lebih dari 1 minggu
  },
  {
    id: 3,
    name: "Healthcare Management System",
    role: "Backend Developer",
    status: true, // In Progress = true
    pinned: false,
    image: "/3.png",
    technologies: ["/skills/03.png"],
    features: ["Patient records", "Appointment scheduling", "Medical billing"],
    repository: "https://github.com/username/healthcare-system",
    liveDemo: "https://healthcare-system.demo.com",
    lastUpdated: "2025-01-12" // Baru diupdate
  },
  {
    id: 4,
    name: "FinTech Analytics Platform",
    role: "Fullstack Developer",
    status: false, // Planning = false
    pinned: true,
    image: "/4.png",
    technologies: ["/skills/04.png"],
    features: ["Financial dashboard", "Investment tracking", "Risk analysis"],
    repository: "https://github.com/username/fintech-platform",
    liveDemo: "https://fintech-platform.demo.com",
    lastUpdated: "2025-01-08" // Kurang dari 1 minggu
  },
  {
    id: 5,
    name: "Social Media Dashboard",
    role: "UI/UX Developer",
    status: false, // Completed = false
    pinned: true,
    image: "/5.png",
    technologies: ["/skills/05.png"],
    features: ["Multi-platform integration", "Content scheduling", "Analytics reporting"],
    repository: "https://github.com/username/social-media-dashboard",
    liveDemo: "https://social-media-dashboard.demo.com",
    lastUpdated: "2024-12-15" // Lebih dari 1 minggu
  }
]

interface Project {
  id: number;
  name: string;
  role: string;
  status: boolean;
  pinned: boolean;
  image: string;
  technologies: string[];
  features: string[];
  repository?: string;
  liveDemo?: string;
}

export default function DashboardPage() {
  const { accentColor } = useThemeMode();

  const [projects] = useState<Project[]>(() => {
    return [...project].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  });

  return (
    <Box>
      <Grid columns={{ initial: '1', md: '4' }} gap='4'>
        {projects.map((i) => (
          <Box key={i.id} maxWidth="480px">
            <Card

              size="3"
              style={{
                overflow: "hidden",
                borderRadius: "18px",
                background: "var(--color-panel-solid)",
                border: "1px solid var(--gray-6)",
                padding: "0",
                position: "relative",
              }}
            >

              {i.pinned && (
                <Box
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "7px",
                    backgroundColor: `var(--${accentColor}-4)`,
                    padding: "6px",
                    borderRadius: "50%",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <TbPinned size={16} color={`var(--${accentColor}-9)`} />
                </Box>
              )}
              <Image
                src="/1.png"
                alt="Project Preview"
                // fill
                height={280}
                width={480}
                style={{ objectFit: "cover", height: "initial" }}
              />


              {/* CONTENT */}
              <Box
                p="4"
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Flex gap='4'>
                  <Badge color={i.status ? "green" : "blue"}
                    size="2">
                    {i.status ? "Active" : "Completed"}
                  </Badge>
                </Flex>
                <div>
                  <Heading size="4" weight="bold">
                    {i.name}
                  </Heading>
                  <Text size="3" color="blue" weight="medium">
                    Fullstack Developer
                  </Text>
                </div>

                {/* DESCRIPTION */}
                <Text size="3" color="gray">
                  A comprehensive attendance monitoring system.
                </Text>

                {/* TECHNOLOGIES */}
                <Box>
                  <Text weight="bold" size="2">
                    TECHNOLOGIES
                  </Text>

                  <Box mt="2" style={{ display: "flex", gap: "7px" }}>
                    <Box
                      width={{ initial: "30px", md: "45px" }}
                      height={{ initial: "30px", md: "45px" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `var(--${accentColor}-6)`,
                        border: "1px solid var(--gray-6)",
                        borderRadius: "50%",
                      }}
                    >
                      <Avatar
                        size="2"
                        src="/skills/01.png"
                        fallback="A"
                        style={{
                          padding: '2px',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s ease',
                          backgroundColor: 'transparent'

                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* KEY FEATURES */}
                <Box style={{ flex: 1 }}>
                  <Text weight="bold" size="2" mb="2">
                    KEY FEATURES
                  </Text>
                  <Flex direction="column" gap="1">
                    {i.features.slice(0, 3).map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + featureIndex * 0.05 }}
                      >
                        <Text
                          size="2"
                          color="gray"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            lineHeight: 1.4
                          }}
                        >
                          <span style={{
                            color: `var(--${accentColor}-9)`,
                            fontSize: '16px'
                          }}>
                            •
                          </span>
                          {feature}
                        </Text>
                      </motion.div>
                    ))}
                  </Flex>
                </Box>

                {/* ACTION BUTTONS */}
                <Flex justify="between" align="end" gap="3" mt="auto">
                  <Flex gap="2">
                    <Button
                      size="1"
                      variant="soft"
                      asChild
                    >
                      <a
                        href={i.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <TbExternalLink size={14} />
                        Repo
                      </a>
                    </Button>
                    {i.liveDemo && (
                      <Button
                        size="1"
                        // color={`var(--${accentColor}-9)`}
                        style={{
                          color: `var(--${accentColor}-1)`,
                          backgroundColor: `var(--${accentColor}-9)`
                        }}
                        asChild
                      >
                        <a
                          href={i?.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <TbExternalLink size={14} />
                          Demo
                        </a>
                      </Button>
                    )}
                  </Flex>

                  <Link href={`/dashboard/${i.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      size="2"
                      style={{
                        color: `var(--${accentColor}-1)`,
                        backgroundColor: `var(--${accentColor}-9)`
                      }}
                    >
                      Details
                      <TbExternalLink size={14} />
                    </Button>
                  </Link>
                </Flex>

              </Box>
            </Card >

          </Box >

        ))}
      </Grid>

    </Box>
  );
}