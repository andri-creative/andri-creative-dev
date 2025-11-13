'use client'
import { Box, Card, Flex, Heading, Text, Badge, Button, Inset, Avatar, Grid } from "@radix-ui/themes";
import Image from "next/image";
import { useAppContext } from "@/app/contexts/AppContext";
import { useState } from "react";
import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

interface Tool {
    id: string;
    title: string;
    url: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    status: boolean;
    role: string;
    demoUrl?: string;
    repoUrl?: string;
    features?: string[];
    tools: Tool[];
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectPage() {
    const { projects, projectsLoading } = useAppContext();
    console.log('projectsLoading:', projectsLoading);

    // console.log(projects);

    return (
        <Box py="6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Heading as="h1" size="7" weight="bold" mb="2" align="center">
                    My Projects
                </Heading>
                <Text as="p" size="4" color="gray" align="center" mb="6">
                    A collection of my recent work and contributions
                </Text>
            </motion.div>

            <Grid
                columns={{ initial: '1', sm: '2', md: '3' }}
                gap="5"
                width="auto"
            >
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </Grid>
        </Box>
    );
}


function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2 }
            }}
            style={{ maxWidth: '100%' }}
        >
            <Card
                size="2"
                style={{
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(145deg, var(--gray-1), var(--gray-2))',
                    border: '1px solid var(--gray-5)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section with Enhanced Effects */}
                <Inset clip="padding-box" side="top" pb="current">
                    <Box style={{ position: 'relative', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={250}
                                style={{
                                    display: 'block',
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '200px',
                                    filter: isHovered ? 'brightness(0.9)' : 'brightness(1)',
                                    transition: 'filter 0.3s ease'
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </motion.div>

                        {/* Loading Skeleton for Image */}
                        {!imageLoaded && (
                            <Box
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundColor: 'var(--gray-4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text size="2" color="gray">Loading...</Text>
                            </Box>
                        )}

                        {/* Status Badge with Glass Effect */}
                        <Badge
                            color={project.status ? "green" : "orange"}
                            size="1"
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                backdropFilter: 'blur(20px)',
                                backgroundColor: 'rgba(255,255,255,0.85)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                fontWeight: '600'
                            }}
                        >
                            {project.status ? "Live" : "In Progress"}
                        </Badge>

                        {/* Hover Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))',
                                pointerEvents: 'none'
                            }}
                        />
                    </Box>
                </Inset>

                {/* Content Section */}
                <Flex direction="column" gap="3" p="4" style={{ flex: 1 }}>
                    {/* Title & Role */}
                    <Box>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                        >
                            <Heading as="h3" size="4" weight="bold" mb="1" style={{ lineHeight: '1.2' }}>
                                {project.title}
                            </Heading>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + index * 0.1 }}
                        >
                            <Text size="2" color="blue" weight="medium">
                                {project.role}
                            </Text>
                        </motion.div>
                    </Box>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <Text size="2" style={{ lineHeight: '1.5', color: 'var(--gray-11)' }}>
                            {project.description}
                        </Text>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + index * 0.1 }}
                    >
                        <Box>
                            <Text size="1" weight="bold" color="gray" mb="2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Technologies
                            </Text>
                            <Flex gap="2" wrap="wrap" align="center">
                                {project.tools.map((tool: Tool) => (
                                    <motion.div
                                        key={tool.id}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Avatar
                                            size="2"
                                            radius="full"
                                            src={tool.url}
                                            alt={tool.title}
                                            fallback={tool.title.charAt(0)}
                                            title={tool.title}
                                            style={{
                                                cursor: 'pointer',
                                                border: '2px solid var(--gray-4)',
                                                transition: 'border-color 0.2s ease'
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </Flex>
                        </Box>
                    </motion.div>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Box>
                                <Text size="1" weight="bold" color="gray" mb="2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Key Features
                                </Text>
                                <Flex direction="column" gap="1">
                                    {project.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                                        <motion.div
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.35 + index * 0.1 + featureIndex * 0.05 }}
                                        >
                                            <Text size="1" color="gray" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ color: 'var(--blue-9)' }}>•</span> {feature}
                                            </Text>
                                        </motion.div>
                                    ))}
                                </Flex>
                            </Box>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        style={{ marginTop: 'auto' }}
                    >
                        <Flex gap="2" mt="2">
                            {project.demoUrl && (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ flex: 1 }}
                                >
                                    <Button
                                        size="2"
                                        variant="solid"
                                        style={{
                                            width: '100%',
                                            background: 'linear-gradient(45deg, var(--blue-9), var(--blue-10))'
                                        }}
                                        asChild
                                    >
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <ArrowTopRightIcon width="16" height="16" />
                                            Live Demo
                                        </a>
                                    </Button>
                                </motion.div>
                            )}
                            {project.repoUrl && (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{ flex: 1 }}
                                >
                                    <Button
                                        size="2"
                                        variant="outline"
                                        style={{ width: '100%' }}
                                        asChild
                                    >
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                            <GitHubLogoIcon width="16" height="16" />
                                            Code
                                        </a>
                                    </Button>
                                </motion.div>
                            )}
                        </Flex>
                    </motion.div>
                </Flex>
            </Card>
        </motion.div>
    );
}