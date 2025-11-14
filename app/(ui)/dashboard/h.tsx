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
        status: "Active",
        pinned: true,
        image: "/1.png",
        technologies: ["/skills/01.png"],
        features: ["Real-time dashboard", "Smart attendance tracking", "Report generation"],
        repository: "https://github.com/your-repo",
        liveDemo: "https://your-demo.com"
    },
    {
        id: 2,
        name: "E-Commerce Mobile App",
        role: "Frontend Developer",
        status: "Completed",
        pinned: false,
        image: "/2.png",
        technologies: ["/skills/02.png", "/skills/03.png"],
        features: ["Product catalog", "Shopping cart", "Payment integration"],
        repository: "https://github.com/your-repo-2",
        liveDemo: "https://your-demo-2.com"
    },
    {
        id: 3,
        name: "Healthcare Management System",
        role: "Backend Developer",
        status: "In Progress",
        pinned: false,
        image: "/3.png",
        technologies: ["/skills/03.png", "/skills/04.png"],
        features: ["Patient records", "Appointment scheduling", "Medical billing"],
        repository: "https://github.com/your-repo-3"
    },
    {
        id: 4,
        name: "FinTech Analytics Platform",
        role: "Fullstack Developer",
        status: "Planning",
        pinned: true,
        image: "/4.png",
        technologies: ["/skills/04.png", "/skills/05.png"],
        features: ["Financial dashboard", "Investment tracking", "Risk analysis"],
        repository: "https://github.com/your-repo-4",
        liveDemo: "https://your-demo-4.com"
    },
    {
        id: 5,
        name: "Social Media Dashboard",
        role: "UI/UX Developer",
        status: "Completed",
        pinned: true,
        image: "/5.png",
        technologies: ["/skills/05.png", "/skills/01.png"],
        features: ["Multi-platform integration", "Content scheduling", "Analytics reporting"],
        repository: "https://github.com/your-repo-5"
    }
]

// Status colors mapping
const statusColors = {
    "Active": "blue",
    "Completed": "green",
    "In Progress": "orange",
    "Planning": "purple"
} as const;

interface Project {
    id: number;
    name: string;
    role: string;
    status: string;
    pinned: boolean;
    image: string;
    technologies: string[];
    features: string[];
    repository: string;
    liveDemo?: string;
}

export default function DashboardPage() {
    const { accentColor } = useThemeMode();

    const [projects] = useState<Project[]>(() => {
        return [...project].sort((a, b) => Number(b.pinned) - Number(a.pinned));
    });

    return (
        <Box>
            <Grid columns={{ initial: '1', md: '2', lg: '3', xl: '4' }} gap='4'>
                {projects.map((project) => (
                    <Box key={project.id} style={{ maxWidth: "100%" }}>
                        <Card
                            size="3"
                            style={{
                                overflow: "hidden",
                                borderRadius: "18px",
                                background: "var(--color-panel-solid)",
                                border: "1px solid var(--gray-6)",
                                padding: "0",
                                position: "relative",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {project.pinned && (
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
                                        zIndex: 10
                                    }}
                                >
                                    <TbPinned size={16} color={`var(--${accentColor}-9)`} />
                                </Box>
                            )}

                            {/* PROJECT IMAGE */}
                            <div style={{ position: "relative", width: "100%", height: "200px" }}>
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            {/* CONTENT */}
                            <Box
                                p="4"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                    flex: 1
                                }}
                            >
                                {/* STATUS & ROLE */}
                                <Flex gap='3' align="center">
                                    <Badge
                                        color={statusColors[project.status as keyof typeof statusColors] || "gray"}
                                        size="2"
                                        variant="solid"
                                    >
                                        {project.status}
                                    </Badge>
                                    <Text size="2" color="gray" weight="medium">
                                        {project.role}
                                    </Text>
                                </Flex>

                                {/* PROJECT NAME */}
                                <div>
                                    <Heading size="4" weight="bold" mb="1">
                                        {project.name}
                                    </Heading>
                                </div>

                                {/* TECHNOLOGIES */}
                                <Box>
                                    <Text weight="bold" size="2" mb="2">
                                        TECHNOLOGIES
                                    </Text>
                                    <Flex gap="2" wrap="wrap">
                                        {project.technologies.map((tech, index) => (
                                            <Box
                                                key={index}
                                                width="40px"
                                                height="40px"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "var(--gray-2)",
                                                    border: "1px solid var(--gray-6)",
                                                    borderRadius: "50%",
                                                    padding: "4px"
                                                }}
                                            >
                                                <Avatar
                                                    src={tech}
                                                    fallback={tech.split("/").pop()?.charAt(0) || "T"}
                                                    style={{
                                                        width: "70%",
                                                        height: "70%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Flex>
                                </Box>

                                {/* KEY FEATURES */}
                                <Box style={{ flex: 1 }}>
                                    <Text weight="bold" size="2" mb="2">
                                        KEY FEATURES
                                    </Text>
                                    <Flex direction="column" gap="2">
                                        {project.features.slice(0, 3).map((feature, featureIndex) => (
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
                                                href={project.repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <TbExternalLink size={14} />
                                                Repo
                                            </a>
                                        </Button>
                                        {project.liveDemo && (
                                            <Button
                                                size="1"
                                                color={accentColor as any}
                                                asChild
                                            >
                                                <a
                                                    href={project.liveDemo}
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

                                    <Link href={`/dashboard/${project.id}`} style={{ textDecoration: 'none' }}>
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
                        </Card>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}