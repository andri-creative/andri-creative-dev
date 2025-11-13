"use client";

import {
    Box,
    Card,
    Grid,
    Heading,
    Text,
    ScrollArea,
    AspectRatio,
    Flex,
    Inset,
    Avatar,
    Badge,
} from "@radix-ui/themes";
import Image from "next/image";
import { ImCodepen } from "react-icons/im";
import { ImStack } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LuComponent } from "react-icons/lu";
import { GrBook } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";

export default function FeaturedSections() {
    const images = [
        "https://res.cloudinary.com/dxvck1hv9/image/upload/v1761821043/my_album/my_album/59-43-17-30-10-2025-0.3024x4032.webp",
        "https://res.cloudinary.com/dxvck1hv9/image/upload/v1761821043/my_album/my_album/59-43-17-30-10-2025-0.3024x4032.webp",
        "https://res.cloudinary.com/dxvck1hv9/image/upload/v1761821043/my_album/my_album/59-43-17-30-10-2025-0.3024x4032.webp",
        "https://res.cloudinary.com/dxvck1hv9/image/upload/v1761821043/my_album/my_album/59-43-17-30-10-2025-0.3024x4032.webp",
    ];

    const messages = [
        {
            id: 1,
            user: "Jasmin Lowery",
            avatar:
                "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70",
            message: "Hi, how are you?",
            isMe: false,
        },
        {
            id: 2,
            user: "Alex Hunt",
            avatar:
                "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?&w=64&h=64&dpr=2&q=70",
            message: "I’m good, working on a project 😊",
            isMe: false,
        },
        {
            id: 3,
            user: "Alex Hunt",
            avatar:
                "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?&w=64&h=64&dpr=2&q=70",
            message: "Can you build a website?",
            isMe: false,
        },
        {
            id: 4,
            user: "You",
            avatar:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?&w=64&h=64&dpr=2&q=70",
            message: "Of course 👍",
            isMe: true,
        },
    ];

    const [current, setCurrent] = useState(0);
    const [startPos, setStartPos] = useState(0);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const items = ["Web", "Mobile", "AI", "UI/UX"];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const next = () => setCurrent((p) => (p + 1) % images.length);
    const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

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
        <Card mb="var(--space-4)">
            <Box p={{ initial: "2", md: "6" }}>
                {/* Haeding */}
                <Box mb="5">
                    <Heading
                        size="8"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <ImCodepen
                            style={{ fontSize: "inherit", verticalAlign: "middle" }}
                        />
                        <Text style={{ margin: 0 }}>Featured Sections</Text>
                    </Heading>
                    <Text size="3" color="gray">
                        Explore everything I`ve crafted, contributed, and accomplished.
                    </Text>
                </Box>
                {/* Concatenate 1*/}
                <Grid
                    style={{ marginBottom: "1rem" }}
                    columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                    gap="4"
                >
                    <Card>
                        <Box p={{ initial: "0", md: "4" }}>
                            <Grid
                                gap="2"
                                columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
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
                                        <ImStack
                                            style={{
                                                fontSize: "inherit",
                                                verticalAlign: "middle",
                                                color: "var(--accent-9)",
                                            }}
                                        />
                                    </Heading>
                                    <Heading>
                                        <Text style={{ margin: 0 }}>Projects Showcase</Text>
                                    </Heading>
                                    <Text size={{ initial: "3" }}>
                                        A selection of real apps built to solve real problems.
                                    </Text>
                                </Box>

                                <Box height={{ initial: "150px", lg: "350px" }}>
                                    <ScrollArea
                                        type="always"
                                        scrollbars="vertical"
                                        style={{ height: "100%" }}
                                    >
                                        <Flex direction="column" gap="4">
                                            <AspectRatio
                                                ratio={16 / 8}
                                                style={{
                                                    border: "4px solid var(--accent-5)",
                                                    borderRadius: "var(--radius-2)",
                                                }}
                                            >
                                                <Image
                                                    src="/project/01.png"
                                                    quality={85}
                                                    fill
                                                    alt="Project "
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "var(--radius-2)",
                                                    }}
                                                />
                                            </AspectRatio>
                                            <AspectRatio ratio={16 / 8}>
                                                <Image
                                                    src="/project/01.png"
                                                    quality={85}
                                                    fill
                                                    alt="Project "
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "var(--radius-2)",
                                                    }}
                                                />
                                            </AspectRatio>
                                            <AspectRatio ratio={16 / 8}>
                                                <Image
                                                    src="/project/01.png"
                                                    quality={85}
                                                    fill
                                                    alt="Project "
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "var(--radius-2)",
                                                    }}
                                                />
                                            </AspectRatio>
                                            <AspectRatio ratio={16 / 8}>
                                                <Image
                                                    src="https://www.shutterstock.com/image-vector/dashboard-great-design-any-site-600nw-2007431381.jpg"
                                                    quality={85}
                                                    fill
                                                    alt="Project "
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "var(--radius-2)",
                                                    }}
                                                />
                                            </AspectRatio>
                                        </Flex>
                                    </ScrollArea>
                                </Box>
                            </Grid>
                        </Box>
                    </Card>
                    <Box>
                        <Grid
                            columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            gap="4"
                        >
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
                                            {images.map((src, i) => {
                                                const position =
                                                    (i - current + images.length) % images.length;

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
                                                } else if (position === images.length - 1) {
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
                                                                    src={src}
                                                                    alt={`card-${i}`}
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
                                            <LuComponent
                                                style={{
                                                    fontSize: "inherit",
                                                    verticalAlign: "middle",
                                                    color: "var(--accent-9)",
                                                }}
                                            />
                                        </Heading>
                                        <Heading>
                                            <Text style={{ margin: 0 }}>Skills & Tools</Text>
                                        </Heading>
                                        <Text size={{ initial: "3" }}>
                                            Covering mobile, web, AI, and UI/UX technologies.
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Flex
                                            gap={{ initial: "2", md: "4" }}
                                            wrap="wrap" //
                                            justify="center"
                                        >
                                            {[...Array(12)].map((_, i) => (
                                                <Box
                                                    key={i}
                                                    p={{ initial: "2", md: "4" }}
                                                    style={{
                                                        backgroundColor: "var(--accent-5)",
                                                        borderRadius: "50%",
                                                    }}
                                                >
                                                    <Avatar
                                                        size="1"
                                                        src={`/skills/he/${i + 1}.png`}
                                                        fallback="A"
                                                    />
                                                </Box>
                                            ))}
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Card>
                        </Grid>
                    </Box>
                </Grid>
                {/* Concatenate 2*/}
                <Grid
                    style={{ marginBottom: "1rem" }}
                    columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                    gap="4"
                >
                    <Box>
                        <Grid
                            columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            gap="4"
                        >
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
                                        <Text size={{ initial: "3" }}>Milestones from programs, projects, and communities.</Text>
                                    </Box>
                                    <Box width={{ initial: "100%", md: "80%" }}>
                                        <Flex direction='column' justify='center' align='center'>
                                            <Box position='relative'>
                                                <Box style={{ border: '2px solid var(--accent-6)', borderRadius: '.3rem', position: 'absolute', left: '-50px', zIndex: -1, rotate: '-10deg' }}>
                                                    <Image src='/achieve/01.png' width={170} height={100} alt="01" style={{ borderRadius: '.3rem' }} />
                                                </Box>
                                                <Box style={{ border: '2px solid var(--accent-6)', borderRadius: '.3rem' }}>
                                                    <Image src='/achieve/01.png' width={170} height={100} alt="01" style={{ borderRadius: '.3rem' }} />
                                                </Box>
                                                <Box style={{ border: '2px solid var(--accent-6)', borderRadius: '.3rem', position: 'absolute', top: 0, right: '-50px', zIndex: -1, rotate: '10deg' }}>
                                                    <Image src='/achieve/01.png' width={170} height={100} alt="01" style={{ borderRadius: '.3rem' }} />
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
                                            <TbMessageChatbot
                                                style={{
                                                    fontSize: "inherit",
                                                    verticalAlign: "middle",
                                                    color: "var(--accent-9)",
                                                }}
                                            />
                                        </Heading>
                                        <Heading>
                                            <Text style={{ margin: 0 }}>Chat Room</Text>
                                        </Heading>
                                        <Text size={{ initial: "3" }}>
                                            Open space to talk and collaborate.
                                        </Text>
                                    </Box>
                                    <Box>
                                        {messages.map((msg) => (
                                            <Flex
                                                key={msg.id}
                                                gap="3"
                                                style={{
                                                    marginBottom: "20px",
                                                    flexDirection: msg.isMe ? "row-reverse" : "row",
                                                }}
                                            >
                                                <Avatar
                                                    size="1"
                                                    src={msg.avatar}
                                                    fallback={msg.user.charAt(0)}
                                                />
                                                <Box
                                                    style={{
                                                        flex: 1,
                                                        textAlign: msg.isMe ? "right" : "left",
                                                    }}
                                                >
                                                    <Flex
                                                        align="center"
                                                        gap="2"
                                                        justify={msg.isMe ? "end" : "start"}
                                                    ></Flex>

                                                    <Box
                                                        style={{
                                                            backgroundColor: msg.isMe
                                                                ? "var(--blue-5)"
                                                                : "var(--gray-3)",
                                                            padding: "4px 12px",
                                                            borderRadius: "3px",
                                                            display: "inline-block",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        <Text
                                                            size="1"
                                                            style={{
                                                                lineHeight: "1.4",
                                                                color: msg.isMe ? "white" : "inherit",
                                                            }}
                                                        >
                                                            {msg.message}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                            </Flex>
                                        ))}
                                    </Box>
                                </Flex>
                            </Card>
                        </Grid>
                    </Box>
                    <Card>
                        <Box p={{ initial: "0", md: "4" }}>
                            <Grid
                                gap="2"
                                columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
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
                                <Box>
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
                    </Card>
                </Grid>
            </Box>
        </Card>
    );
}
