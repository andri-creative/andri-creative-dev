"use client";

import { useState } from "react";
import {
    Box,
    Flex,
    Text,
    Avatar,
    Card,
    ScrollArea,
    TextField,
    Button,
} from "@radix-ui/themes";
import {
    ChatBubbleIcon,
    PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";

interface Message {
    id: number;
    content: string;
    sender: string;
    time: string;
    isOwn: boolean;
}

interface ChatMessagesProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isMobile: boolean;
}

export default function ChatMessages({
    messages,
    onSendMessage,
    isMobile,
}: ChatMessagesProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Messages List */}
            <ScrollArea style={{ flex: 1, padding: '16px' }}>
                <Flex direction="column" gap="4">
                    {messages.length === 0 ? (
                        <Flex
                            align="center"
                            justify="center"
                            direction="column"
                            gap="3"
                            style={{ height: '300px' }}
                        >
                            <Avatar size="5" fallback="👋" />
                            <Text size="2" color="gray" align="center">
                                Say hello to start the conversation!
                            </Text>
                        </Flex>
                    ) : (
                        messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    alignSelf: msg.isOwn ? 'flex-end' : 'flex-start',
                                    maxWidth: isMobile ? '85%' : '70%'
                                }}
                            >
                                <Card
                                    size="1"
                                    style={{
                                        backgroundColor: msg.isOwn ? 'var(--accent-3)' : 'var(--gray-3)',
                                        border: '1px solid var(--gray-6)',
                                        maxWidth: '100%'
                                    }}
                                >
                                    <Flex direction="column" gap="1">
                                        <Flex justify="between" align="center" wrap="wrap">
                                            <Text size="1" weight="bold">
                                                {msg.sender}
                                            </Text>
                                            <Text size="1" color="gray">
                                                {msg.time}
                                            </Text>
                                        </Flex>
                                        <Text size="2" style={{ wordBreak: 'break-word' }}>
                                            {msg.content}
                                        </Text>
                                    </Flex>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </Flex>
            </ScrollArea>

            {/* Message Input */}
            <Box p="4" style={{ borderTop: '1px solid var(--gray-6)' }}>
                <Flex gap="2" align="center">
                    <TextField.Root
                        style={{ flex: 1 }}
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size={{ initial: "1", sm: "2" }}
                    >
                        <TextField.Slot>
                            <ChatBubbleIcon />
                        </TextField.Slot>
                    </TextField.Root>
                    <Button
                        onClick={handleSend}
                        size={{ initial: "1", sm: "2" }}
                    >
                        <PaperPlaneIcon />
                        <Text as="span" style={{ display: isMobile ? 'none' : 'inline' }}>
                            Send
                        </Text>
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}