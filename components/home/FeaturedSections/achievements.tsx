'use client'

import {
    Box,
    Card,
    Heading,
    Text,
    Flex,
} from "@radix-ui/themes";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
export const MotionBox = motion(Box);
import Image from "next/image";

import type { AchievementStats } from "@/types/achievement"
import { useMemo } from "react";

interface AchievementProms {
    achievement: AchievementStats[]
}


export default function Achievements({ achievement }: AchievementProms) {

    const sortedAchievements = useMemo(() => {
        if (!Array.isArray(achievement)) return [];

        const pinnedOnly = achievement.filter((i) => i.pinned === true);

        const sorted = pinnedOnly.sort((a, b) => {
            const dateA = new Date(a.issueDate.split(",")[0]);
            const dateB = new Date(b.issueDate.split(",")[0]);
            return dateB.getTime() - dateA.getTime();
        });

        return sorted.slice(0.3);
    }, [achievement]);

    return (
        <Card>
            <Flex
                direction="column"
                gap="4"
                justify="center"
                align="center"
            >
                <Box
                    p={{ initial: "0", md: "4" }}
                    style={{ textAlign: "center" }}
                >
                    <Heading
                        size={{ initial: "5", md: "8" }}
                        mb={{ initial: "1", md: "4" }}
                        style={{
                            padding: ".5rem",
                            backgroundColor: "var(--accent-5)",
                            width: "fit-content",
                            borderRadius: ".3rem",
                            margin: "0 auto",
                        }}
                    >
                        <FiUser
                            style={{
                                fontSize: "inherit",
                                verticalAlign: "middle",
                                color: "var(--accent-9)",
                            }}
                        />
                    </Heading>
                    <Heading>
                        <Text style={{ margin: 0 }}>Achievements</Text>
                    </Heading>
                    <Text size={{ initial: "3" }}>
                        Milestones from programs, projects, and communities.
                    </Text>
                </Box>
                <Box width={{ initial: "100%", md: "80%" }}>
                    <Flex direction="column" justify="center" align="center">
                        <Box position="relative" style={{ height: "120px" }}>
                            <MotionBox
                                style={{
                                    border: "2px solid var(--accent-6)",
                                    borderRadius: ".3rem",
                                    position: "absolute",
                                    left: "-50px",
                                    zIndex: -1,
                                    rotate: "-10deg",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    pointerEvents: "auto"
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    zIndex: 3,
                                    rotate: "-5deg",
                                    transition: { type: "spring", stiffness: 200 },
                                }}
                            >
                                {sortedAchievements[0]?.src && (
                                    <Image
                                        src={sortedAchievements[0].src}
                                        width={170}
                                        height={100}
                                        alt={sortedAchievements[0].id + "show"}
                                        style={{ borderRadius: ".3rem" }}
                                    />
                                )}
                            </MotionBox>
                            <Box
                                style={{
                                    border: "2px solid var(--accent-6)",
                                    borderRadius: ".3rem",
                                }}
                            >
                                {sortedAchievements[1]?.src && (
                                    <Image
                                        src={sortedAchievements[1].src}
                                        width={170}
                                        height={100}
                                        alt={sortedAchievements[1].id + "show"}
                                        style={{ borderRadius: ".3rem" }}
                                    />
                                )}
                            </Box>
                            <Box
                                style={{
                                    border: "2px solid var(--accent-6)",
                                    borderRadius: ".3rem",
                                    position: "absolute",
                                    top: 0,
                                    right: "-50px",
                                    zIndex: -1,
                                    rotate: "10deg",
                                }}
                            >
                                {sortedAchievements[2]?.src && (
                                    <Image
                                        src={sortedAchievements[2].src}
                                        width={170}
                                        height={100}
                                        alt={sortedAchievements[2].id + "show"}
                                        style={{ borderRadius: ".3rem" }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Image
                            src="/achieve/folder.png"
                            width={100}
                            height={55}
                            alt="oi"
                            className="object-cover translate-y-[-20px]"
                        />
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}