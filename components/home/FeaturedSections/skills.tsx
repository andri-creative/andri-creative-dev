import {
    Box,
    Card,
    Heading,
    Text,
    Flex,
    Avatar,
} from "@radix-ui/themes";
import { LuComponent } from "react-icons/lu";

export default function Skills() {
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
    )
}