import {
    Box,
    Grid,
    Heading,
    Text,
    ScrollArea,
    AspectRatio,
    Flex,
} from "@radix-ui/themes";
import { ImStack } from "react-icons/im";
import Image from "next/image";

import type { ProjectStats } from "@/types/project"

interface PropsProject {
    project: ProjectStats[];
}


export default function Project({ project }: PropsProject) {
    return (
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

            <Box height={{ initial: "180px", sm: "250px", lg: "350px" }}>
                <ScrollArea
                    type="always"
                    scrollbars="vertical"
                    style={{ height: "100%" }}
                >
                    <Flex direction="column" gap="4">
                        {project.map((i) => (
                            <AspectRatio
                                key={i.id}
                                ratio={16 / 8}
                                style={{
                                    border: "4px solid var(--accent-5)",
                                    borderRadius: "var(--radius-2)",
                                }}
                            >
                                <Image
                                    src={i.image}
                                    quality={85}
                                    fill
                                    alt={i.id + "demo preview"}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "var(--radius-2)",
                                    }}
                                />
                            </AspectRatio>
                        ))}

                        {/* <AspectRatio ratio={16 / 8}>
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
                        </AspectRatio> */}
                    </Flex>
                </ScrollArea>
            </Box>
        </Grid>
    )
}