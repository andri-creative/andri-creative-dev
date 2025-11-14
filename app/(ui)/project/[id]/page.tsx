'use client'

import {
    Card,
    Text,
    Heading,
    Flex,
    Box,
    Badge,
    Button,
    Avatar,
    Grid,
    AspectRatio,
} from "@radix-ui/themes";
import { useParams, notFound } from "next/navigation";
import { useThemeMode } from "@/components/ThemeProvider";
import { useAppContext } from "@/app/contexts/AppContext";
import { TbPinned, TbArrowLeft, TbExternalLink, TbBrandGithub } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const staggerVariants = {
    initial: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};


export default function ProjectDetail() {
    const { accentColor } = useThemeMode();
    const params = useParams();
    const { projects, projectsLoading } = useAppContext();
    console.log("projectsLoading:", projectsLoading);


    const projectId = params?.id as string;
    const project = projects.find(p => p.id === projectId);

    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

    if (!project) {
        notFound();
    }

    useEffect(() => {
        async function getScreenshot() {
            if (!project?.demoUrl) return;

            const res = await fetch(
                `https://api.microlink.io/?url=${project.demoUrl}&meta=false&screenshot=true`
            );
            const data = await res.json();

            setScreenshotUrl(data?.data?.screenshot?.url || null);
        }

        getScreenshot();
    }, [project]);

    return (
        <motion.div initial="initial" animate="enter">
            <Box p="4">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Link href="/project" style={{ textDecoration: "none" }}>
                        <Button variant="soft" size="2" mb="5">
                            <TbArrowLeft />
                            Back to Projects
                        </Button>
                    </Link>
                </motion.div>

                <Grid columns={{ initial: "1", lg: "3" }} gap="6" >
                    {/* Main Content */}
                    <Box gridColumn={{ initial: 'span 2', lg: 'span 2' }}>
                        <motion.div
                            variants={staggerVariants}
                            initial="initial"
                            animate="enter"
                        >
                            {/* Header Section */}
                            <motion.div variants={itemVariants}>
                                <Card
                                    size="3"
                                    style={{ borderRadius: "20px", marginBottom: "24px" }}
                                >
                                    <Flex gap="4" direction="column" align="start">
                                        <AspectRatio ratio={16 / 10}>
                                            <Image
                                                src={screenshotUrl || project.image}
                                                alt={project.title}
                                                fill
                                                sizes="100vw"
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    borderRadius: "12px 12px 0 0"
                                                }}
                                            />
                                        </AspectRatio>

                                        <Box style={{ flex: 1, width: "100%" }}>
                                            {/* Status & Role Badge */}
                                            <Flex align="center" gap="3" mb="3">
                                                {project.pinned && (
                                                    <Flex align="center" gap="1" ml="auto">
                                                        <TbPinned size={14} color={`var(--${accentColor}-9)`} />
                                                        <Text size="1" color="gray">
                                                            Pinned
                                                        </Text>
                                                    </Flex>
                                                )}
                                            </Flex>

                                            <Heading size="7" weight="bold" mb="3">
                                                {project.title}
                                            </Heading>

                                            <Text size="4" color="gray" style={{ lineHeight: 1.7 }}>
                                                {project.description}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </motion.div>

                            {/* Features Section */}
                            <motion.div variants={itemVariants}>
                                <Card
                                    size="3"
                                    style={{ borderRadius: "20px", marginBottom: "24px" }}
                                >
                                    <Heading size="5" weight="bold" mb="4">
                                        Key Features
                                    </Heading>
                                    <Grid columns={{ initial: "1", md: "2" }} gap="4">
                                        {project.features.map((feature, index) => (
                                            <motion.div
                                                key={feature}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                            >
                                                <Flex gap="3" align="start">
                                                    <Box
                                                        style={{
                                                            width: "6px",
                                                            height: "6px",
                                                            borderRadius: "50%",
                                                            backgroundColor: `var(--${accentColor}-9)`,
                                                            marginTop: "8px",
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <Text size="3" weight="medium" style={{ lineHeight: 1.5 }}>
                                                        {feature}
                                                    </Text>
                                                </Flex>
                                            </motion.div>
                                        ))}
                                    </Grid>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </Box>

                    {/* Sidebar */}
                    <Box gridColumn={{ initial: 'span 2', lg: 'span 1' }}>
                        <motion.div
                            variants={staggerVariants}
                            // initial="initial"
                            animate="enter"
                        >
                            {/* Technologies Card */}
                            <motion.div variants={itemVariants}>
                                <Card
                                    size="3"
                                    style={{ borderRadius: "20px", marginBottom: "24px" }}
                                >
                                    <Heading size="5" weight="bold" mb="4">
                                        Technologies Used
                                    </Heading>
                                    <Flex direction="column" gap="4">
                                        {project.tools.map((tech, index) => (
                                            <motion.div
                                                key={tech.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                            >
                                                <Flex gap="3" align="center">
                                                    <Avatar
                                                        src={tech.url}
                                                        fallback={
                                                            tech.title.split("/").pop()?.charAt(0).toUpperCase() || "T"
                                                        }
                                                        size="3"
                                                        style={{
                                                            border: "1px solid var(--gray-6)",
                                                            backgroundColor: "var(--gray-2)"
                                                        }}
                                                    />
                                                    <Box>
                                                        <Text size="3" weight="medium">
                                                            {tech.title.split("/").pop()?.replace(".png", "").replace(/\d/g, '') || "Technology"}
                                                        </Text>
                                                        <Text size="1" color="gray">
                                                            {project.role.includes("Fullstack") ? "Fullstack" :
                                                                project.role.includes("Frontend") ? "Frontend" :
                                                                    project.role.includes("Backend") ? "Backend" : "UI/UX"}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </motion.div>
                                        ))}
                                    </Flex>
                                </Card>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div variants={itemVariants}>
                                <Card size="3" style={{ borderRadius: "20px" }}>
                                    <Heading size="5" weight="bold" mb="4">
                                        Project Links
                                    </Heading>
                                    <Flex direction="column" gap="3">
                                        <Button
                                            size="3"
                                            variant="soft"
                                            asChild
                                            style={{ justifyContent: "flex-start" }}
                                        >
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: "none" }}
                                            >
                                                <TbBrandGithub size={18} />
                                                <Text>GitHub Repository</Text>
                                            </a>
                                        </Button>
                                        {project.demoUrl && (
                                            <Button
                                                size="3"
                                                // color={accentColor as any}
                                                asChild
                                                style={{
                                                    justifyContent: "flex-start",
                                                    backgroundColor: `var(--${accentColor}-9)`,
                                                    color: "white"
                                                }}
                                            >
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <TbExternalLink size={18} />
                                                    <Text>Live Demo</Text>
                                                </a>
                                            </Button>
                                        )}
                                        <Box mt="2">
                                            <Text size="1" color="gray" style={{ textAlign: "center" }}>
                                                Last updated: {new Date().toLocaleDateString("id-ID")}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </motion.div>

                            {/* Project Info Card */}
                            <motion.div variants={itemVariants}>
                                <Card size="3" style={{ borderRadius: "20px", marginTop: "24px" }}>
                                    <Heading size="5" weight="bold" mb="4">
                                        Project Info
                                    </Heading>
                                    <Flex direction="column" gap="3">
                                        <Flex justify="between">
                                            <Text size="2" color="gray">Status:</Text>
                                            <Badge
                                                color={project.status ? "green" : "blue"}
                                                size="1"
                                                style={{
                                                    backgroundColor: `var(--${accentColor}-5)`,
                                                    color: `var(--${accentColor}-9)`,
                                                }}
                                            >
                                                {project.status ? "Active" : "Completed"}
                                            </Badge>
                                        </Flex>
                                        <Flex justify="between">
                                            <Text size="2" color="gray">Role:</Text>
                                            <Text size="2" weight="medium">{project.role}</Text>
                                        </Flex>
                                        <Flex justify="between">
                                            <Text size="2" color="gray">Type:</Text>
                                            <Text size="2" weight="medium">
                                                {project.techStack.length > 1 ? "Full Stack" : "Frontend"}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </Box>
                </Grid>
            </Box >
        </motion.div >
    )
}