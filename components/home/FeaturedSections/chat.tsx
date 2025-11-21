import {
    Box,
    Card,
    Heading,
    Text,
    Flex,
    Avatar,
} from "@radix-ui/themes";

import { TbMessageChatbot } from "react-icons/tb";

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

export default function Chat() {
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
    )
}