"use client";

import React from "react";
import {
    Box,
    Container,
    Flex,
    Text,
    Heading,
    Button,
    Card
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import {
    TbTools,
    TbRefresh,
    TbHome,
    TbClock,
    TbServerCog
} from "react-icons/tb";

export default function MaintenancePage() {
    return (
        <Box
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, var(--blue-1) 0%, var(--purple-1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container size="2">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card
                        size="4"
                        style={{
                            textAlign: 'center',
                            background: 'var(--color-panel-solid)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                            border: '1px solid var(--gray-6)'
                        }}
                    >
                        {/* Animated Icon */}
                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, -5, 5, 0],
                                scale: [1, 1.1, 1, 1.05, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                            style={{ marginBottom: '24px' }}
                        >
                            <TbTools
                                size={80}
                                color="var(--orange-9)"
                                style={{ display: 'block', margin: '0 auto' }}
                            />
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Heading
                                size="8"
                                weight="bold"
                                mb="3"
                                style={{
                                    background: 'linear-gradient(135deg, var(--orange-9), var(--red-9))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Under Maintenance
                            </Heading>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Text
                                size="5"
                                color="gray"
                                mb="5"
                                style={{ lineHeight: 1.6 }}
                            >
                                We&#39;re currently performing some updates and improvements to provide you with a better experience.
                            </Text>
                        </motion.div>

                        {/* Status Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Flex
                                justify="center"
                                gap="5"
                                mb="6"
                                wrap="wrap"
                            >
                                <Flex direction="column" align="center" gap="2">
                                    <TbServerCog size={24} color="var(--blue-9)" />
                                    <Text size="2" weight="medium">System Updates</Text>
                                    <Text size="1" color="gray">In Progress</Text>
                                </Flex>

                                <Flex direction="column" align="center" gap="2">
                                    <TbClock size={24} color="var(--orange-9)" />
                                    <Text size="2" weight="medium">Estimated Time</Text>
                                    <Text size="1" color="gray">~30 minutes</Text>
                                </Flex>
                            </Flex>
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ delay: 1, duration: 2 }}
                            style={{
                                height: '6px',
                                background: 'linear-gradient(90deg, var(--blue-9), var(--purple-9))',
                                borderRadius: '3px',
                                margin: '0 auto 24px'
                            }}
                        />

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <Flex gap="3" justify="center" wrap="wrap">
                                <Button
                                    size="3"
                                    variant="soft"
                                    onClick={() => window.location.reload()}
                                >
                                    <TbRefresh />
                                    Try Again
                                </Button>

                                <Button
                                    size="3"
                                    color="orange"
                                    onClick={() => window.location.href = '/home'}
                                >
                                    <TbHome />
                                    Back to Home
                                </Button>
                            </Flex>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                padding: '8px',
                                background: 'var(--orange-3)',
                                borderRadius: '8px'
                            }}
                        >
                            <Text size="1" weight="bold" color="orange">
                                MAINTENANCE MODE
                            </Text>
                        </motion.div>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
}