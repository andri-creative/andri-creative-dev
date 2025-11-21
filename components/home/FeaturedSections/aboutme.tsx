'use client'

import {
    Box,
    Card,
    Heading,
    Text,
    Flex,
    Inset,
} from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface AlbumStates {
    id: string,
    title?: string
    width: number;
    height: number
    url: string
    publicId?: string;
    createdAt?: number
    updatedAt?: number;
}

interface AlbumProms {
    myAlbum: AlbumStates[]
}

export default function AboutMe({ myAlbum }: AlbumProms) {

    const [current, setCurrent] = useState(0);
    const [startPos, setStartPos] = useState(0);

    const filterAlbum = myAlbum
        .filter((item) => item.width < item.height)
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        .slice(0, 10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % filterAlbum.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [filterAlbum.length]);

    const next = () => setCurrent((p) => (p + 1) % filterAlbum.length);
    const prev = () => setCurrent((p) => (p - 1 + filterAlbum.length) % filterAlbum.length);

    const handleTouchStart = (e: React.TouchEvent) =>
        setStartPos(e.touches[0].clientX);

    const handleTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - startPos;
        if (Math.abs(dx) > 50) {
            if (dx < 0) {
                next();
            } else {
                prev();
            }
        }
    };

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
                        <Text style={{ margin: 0 }}>About Me</Text>
                    </Heading>
                    <Text size={{ initial: "3" }}>Who I am and what I do.</Text>
                </Box>
                <Box
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        width: "100%",
                        maxWidth: 400,
                        margin: "0 auto",
                        position: "relative",
                        height: 260,
                        overflow: "visible",
                    }}
                >
                    <AnimatePresence>
                        {filterAlbum.map((src, i) => {
                            const position =
                                (i - current + filterAlbum.length) % filterAlbum.length;

                            let transform = "";
                            let zIndex = 1;
                            let opacity = 0.6;

                            if (position === 0) {
                                transform = "translateX(0%) rotate(0deg) scale(1)";
                                zIndex = 3;
                                opacity = 1;
                            } else if (position === 1) {
                                transform = "translateX(95%) rotate(8deg) scale(0.9)";
                                zIndex = 2;
                            } else if (position === filterAlbum.length - 1) {
                                transform =
                                    "translateX(-95%) rotate(-8deg) scale(0.9)";
                                zIndex = 2;
                            } else {
                                transform = "translateY(80px) scale(0.8)";
                                opacity = 0;
                            }

                            return (
                                <motion.div
                                    key={i}
                                    animate={{ transform, opacity, zIndex }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        translate: "-50% -50%",
                                    }}
                                >
                                    <Card
                                        size="2"
                                        style={{
                                            width: 150,
                                            height: 200,
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                                        }}
                                    >
                                        <Inset clip="padding-box" side="top" pb="current">
                                            <Image
                                                src={src.url}
                                                alt={src.id + "About"}
                                                width={150}
                                                height={200}
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "var(--gray-5)",
                                                }}
                                            />
                                        </Inset>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </Box>
            </Flex>
        </Card>
    )
}