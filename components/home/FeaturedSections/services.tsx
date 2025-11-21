'use client'

import {
    Box,
    Grid,
    Heading,
    Text,
    Flex,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { GrBook } from "react-icons/gr";




const items = ["Web", "Mobile", "AI", "UI/UX"];


export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Box p={{ initial: "0", md: "4" }}>
            <Grid
                gap="2"
                columns={{ initial: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
            >
                <Box>
                    <Heading
                        size={{ initial: "5", md: "8" }}
                        mb={{ initial: "1", md: "4" }}
                        style={{
                            padding: ".5rem",
                            backgroundColor: "var(--accent-5)",
                            width: "fit-content",
                            borderRadius: ".3rem",
                        }}
                    >
                        <GrBook
                            style={{
                                fontSize: "inherit",
                                verticalAlign: "middle",
                                color: "var(--accent-9)",
                            }}
                        />
                    </Heading>
                    <Heading>
                        <Text style={{ margin: 0 }}>Services</Text>
                    </Heading>
                    <Text size={{ initial: "3" }}>
                        End-to-end solutions in web, mobile, AI, and design.
                    </Text>
                </Box>
                <Box height={{ initial: "180px", sm: "250px", lg: "350px" }}>
                    <Flex
                        direction="column"
                        gap={{ initial: "2", md: "5" }}
                        justify="center"
                        align="center"
                    >
                        {items.map((text, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                animate={{
                                    filter:
                                        hoveredIndex === index ? "blur(0px)" : "blur(4px)",
                                    opacity: hoveredIndex === index ? 1 : 0.6,
                                    scale: hoveredIndex === index ? 1.05 : 1,
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Heading size={{ initial: "4", md: "9" }} weight="bold">
                                    {text}
                                </Heading>
                            </motion.div>
                        ))}
                    </Flex>
                </Box>
            </Grid>
        </Box>
    )
}