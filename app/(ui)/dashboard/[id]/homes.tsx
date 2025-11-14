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
} from "@radix-ui/themes";
import { useThemeMode } from "@/components/ThemeProvider";
import Image from "next/image";

export default function DashboardPage() {
    const { accentColor, mode } = useThemeMode();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        async function getScreenshot() {
            const res = await fetch(
                "https://api.microlink.io/?url=https://www.netflix.com/id/&meta=false&screenshot=true"
            );
            const data = await res.json();
            setPreviewUrl(data?.data?.screenshot?.url || null);
        }
        getScreenshot();
    }, []);

    return (
        <Box className="p-6 space-y-6">
            {/* Header */}
            <Flex justify="between" align="center">
                <Heading size="7" weight="bold">
                    Dashboard Overview
                </Heading>
                <Badge size="2">
                    Live Data
                </Badge>
            </Flex>

            {/* Description */}
            <Text
                as="p"
                size="3"
                style={{
                    color:
                        mode === "dark"
                            ? `var(--${accentColor}-11)`
                            : `var(--${accentColor}-9)`,
                }}
            >
                Welcome to your dashboard. Heres an overview of your activity and
                performance metrics.
            </Text>

            {/* Website Preview Section */}
            <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
                <Card
                    size="3"
                    style={{
                        overflow: "hidden",
                        borderRadius: "var(--radius-3)",
                        boxShadow: "var(--shadow-4)",
                    }}
                >
                    <Box
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "180px",
                            overflow: "hidden",
                            borderRadius: "var(--radius-3)",
                        }}
                    >
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="andri.biz.id preview"
                                fill
                                style={{
                                    objectFit: "cover",
                                    transition: "transform .4s ease",
                                }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.05)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.0)")
                                }
                            />
                        ) : (
                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    color: "var(--gray-11)",
                                }}
                            >
                                Loading preview...
                            </Box>
                        )}
                    </Box>

                    <Box p="3" style={{ textAlign: "center" }}>
                        <Heading size="4" weight="bold">
                            My Portfolio Website
                        </Heading>
                        <Text size="2" color="gray" as="p" style={{ marginTop: "4px" }}>
                            Preview of{" "}
                            <a
                                href="https://andri.biz.id"
                                target="_blank"
                                style={{ color: "var(--accent-11)" }}
                            >
                                andri.biz.id
                            </a>
                        </Text>
                    </Box>
                </Card>
            </Grid>
        </Box>
    );
}
