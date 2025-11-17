"use client";

import React from "react";
import { Box, Container, Flex, Text, Heading, Button, Card } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { TbTools, TbRefresh, TbHome, TbClock, TbServerCog } from "react-icons/tb";

export default function MaintenancePage() {
    return (
        <Box
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, var(--blue-1), var(--purple-1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(12px, 4vw, 32px)" // responsive padding
            }}
        >
            <Container size="3">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card
                        style={{
                            textAlign: "center",
                            background: "var(--color-panel-solid)",
                            borderRadius: "24px",
                            padding: "clamp(16px, 4vw, 40px)", // responsive card padding
                            border: "1px solid var(--gray-6)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                            width: "100%",
                            maxWidth: "640px",
                            margin: "0 auto"
                        }}
                    >
                        {/* ICON ANIMATION */}
                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, -5, 5, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            style={{ marginBottom: "clamp(12px, 4vw, 24px)" }}
                        >
                            <TbTools
                                size={80}
                                style={{
                                    width: "clamp(40px, 12vw, 80px)",
                                    height: "clamp(40px, 12vw, 80px)",
                                    margin: "0 auto",
                                    display: "block",
                                    color: "var(--orange-9)"
                                }}
                            />
                        </motion.div>

                        {/* TITLE */}
                        <Heading
                            weight="bold"
                            style={{
                                background: "linear-gradient(135deg, var(--orange-9), var(--red-9))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                                marginBottom: "12px"
                            }}
                        >
                            Under Maintenance
                        </Heading>

                        {/* MESSAGE */}
                        <Text
                            color="gray"
                            style={{
                                fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
                                lineHeight: 1.6,
                                marginBottom: "clamp(16px, 3vw, 24px)"
                            }}
                        >
                            We’re currently performing some updates to improve your experience.
                        </Text>

                        {/* STATUS BOXES */}
                        <Flex
                            justify="center"
                            wrap="wrap"
                            gap="5"
                            style={{ marginBottom: "clamp(12px, 4vw, 24px)" }}
                        >
                            {/* ITEM 1 */}
                            <Flex direction="column" align="center" gap="2">
                                <TbServerCog
                                    style={{
                                        width: "clamp(24px, 6vw, 32px)",
                                        height: "clamp(24px, 6vw, 32px)",
                                        color: "var(--blue-9)"
                                    }}
                                />
                                <Text weight="medium" size="2">
                                    System Updates
                                </Text>
                                <Text size="1" color="gray">
                                    In Progress
                                </Text>
                            </Flex>

                            {/* ITEM 2 */}
                            <Flex direction="column" align="center" gap="2">
                                <TbClock
                                    style={{
                                        width: "clamp(24px, 6vw, 32px)",
                                        height: "clamp(24px, 6vw, 32px)",
                                        color: "var(--orange-9)"
                                    }}
                                />
                                <Text weight="medium" size="2">
                                    Estimated Time
                                </Text>
                                <Text size="1" color="gray">
                                    ~30 minutes
                                </Text>
                            </Flex>
                        </Flex>

                        {/* PROGRESS BAR */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 2 }}
                            style={{
                                height: "6px",
                                background: "linear-gradient(90deg, var(--blue-9), var(--purple-9))",
                                borderRadius: "4px",
                                margin: "0 auto clamp(16px, 4vw, 24px)",
                                maxWidth: "400px"
                            }}
                        />

                        {/* BUTTONS */}
                        <Flex
                            justify="center"
                            wrap="wrap"
                            gap="3"
                            style={{ marginBottom: "clamp(8px, 2vw, 16px)" }}
                        >
                            <Button
                                variant="soft"
                                size="3"
                                onClick={() => window.location.reload()}
                                style={{
                                    width: "clamp(130px, 40vw, 180px)"
                                }}
                            >
                                <TbRefresh />
                                Try Again
                            </Button>

                            <Button
                                color="orange"
                                size="3"
                                onClick={() => (window.location.href = "/home")}
                                style={{
                                    width: "clamp(130px, 40vw, 180px)"
                                }}
                            >
                                <TbHome />
                                Back to Home
                            </Button>
                        </Flex>

                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
}
