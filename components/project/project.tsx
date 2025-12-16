"use client";

import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Avatar,
  Grid,
} from "@radix-ui/themes";
import { useThemeMode } from "@/components/ThemeProvider";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TbPinned, TbExternalLink } from "react-icons/tb";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { ProjectStats } from "@/types/project";
import { slugify } from "@/lib/slugify";

interface ProjectProms {
  project: ProjectStats[];
}

export default function Project({ project }: ProjectProms) {
  const { accentColor } = useThemeMode();
  const router = useRouter();

  const sortedProjects = useMemo(() => {
    if (!Array.isArray(project)) return [];
    return [...project].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [project]);

  const handleViewDetails = (title: string) => {
    const slug = slugify(title);
    router.push(`/project/${slug}`);
  };

  return (
    <Box>
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
        columns={{ initial: "1", sm: "2", md: "3", xl: "4" }}
        gap="4"
        width="auto"
      >
        <AnimatePresence>
          {sortedProjects.map((i) => (
            <Box key={i.id} maxWidth="480px">
              <Card
                size="3"
                style={{
                  overflow: "hidden",
                  borderRadius: "18px",
                  background: "var(--color-panel-solid)",
                  border: "1px solid var(--gray-6)",
                  padding: "0",
                  position: "relative",
                }}
              >
                {i.pinned && (
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
                    }}
                  >
                    <TbPinned size={16} color={`var(--${accentColor}-9)`} />
                  </Box>
                )}
                <Image
                  src={i.image}
                  alt={i.id + "demo preview"}
                  // fill
                  height={280}
                  width={480}
                  style={{ objectFit: "cover", height: "initial" }}
                />

                {/* CONTENT */}
                <Box
                  p="4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Flex gap="4">
                    <Badge color={i.status ? "green" : "blue"} size="2">
                      {i.status ? "Active" : "Completed"}
                    </Badge>
                  </Flex>
                  <div>
                    <Heading size="4" weight="bold">
                      {i.title}
                    </Heading>
                    <Text size="3" color="blue" weight="medium">
                      {i.role}
                    </Text>
                  </div>

                  {/* DESCRIPTION */}
                  <Text
                    size="3"
                    color="gray"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {i.description}
                  </Text>

                  {/* TECHNOLOGIES */}
                  <Box>
                    <Text weight="bold" size="2">
                      TECHNOLOGIES
                    </Text>

                    <Box mt="2" style={{ display: "flex", gap: "7px" }}>
                      {i.tools.map((tools) => (
                        <Box
                          key={tools.id}
                          width={{ initial: "30px", md: "45px" }}
                          height={{ initial: "30px", md: "45px" }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: `var(--${accentColor}-6)`,
                            border: "1px solid var(--gray-6)",
                            borderRadius: "50%",
                          }}
                        >
                          <Avatar
                            size="2"
                            src={tools.url}
                            fallback="A"
                            style={{
                              padding: "2px",
                              cursor: "pointer",
                              transition: "border-color 0.2s ease",
                              backgroundColor: "transparent",
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* KEY FEATURES */}
                  <Box style={{ flex: 1 }}>
                    <Text weight="bold" size="2" mb="2">
                      KEY FEATURES
                    </Text>
                    <Flex direction="column" gap="1">
                      {(i.features ?? [])
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
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
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                lineHeight: 1.4,
                              }}
                            >
                              <span
                                style={{
                                  color: `var(--${accentColor}-9)`,
                                  fontSize: "16px",
                                }}
                              >
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
                      <Button size="1" variant="soft" asChild>
                        <a
                          href={i.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <TbExternalLink size={14} />
                          Repo
                        </a>
                      </Button>
                      {i.demoUrl && (
                        <Button
                          size="1"
                          // color={`var(--${accentColor}-9)`}
                          style={{
                            color: `var(--${accentColor}-1)`,
                            backgroundColor: `var(--${accentColor}-9)`,
                          }}
                          asChild
                        >
                          <a
                            href={i?.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <TbExternalLink size={14} />
                            Demo
                          </a>
                        </Button>
                      )}
                    </Flex>
                    <Button
                      onClick={() => handleViewDetails(i.title)}
                      size="2"
                      style={{
                        color: `var(--${accentColor}-1)`,
                        backgroundColor: `var(--${accentColor}-9)`,
                        cursor: "pointer",
                      }}
                    >
                      Details
                      <TbExternalLink size={14} />
                    </Button>
                  </Flex>
                </Box>
              </Card>
            </Box>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
}
