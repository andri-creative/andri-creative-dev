"use client";

import {
    Box,
    Flex,
    Text,
    Avatar,
    Card,
    ScrollArea,
    TextField,
    IconButton,
} from "@radix-ui/themes";
import {
    MagnifyingGlassIcon,
    Cross2Icon,
    HamburgerMenuIcon,
} from "@radix-ui/react-icons";

interface User {
    id: number;
    name: string;
    isOnline: boolean;
    lastSeen: string;
}

interface MemberListProps {
    users: User[];
    onlineCount: number;
    isMobile?: boolean;
    onClose: () => void;
    onShowSidebar?: () => void;
}

export default function MemberList({
    users,
    onlineCount,
    isMobile = false,
    onClose,
    onShowSidebar,
}: MemberListProps) {
    const onlineUsers = users.filter(u => u.isOnline);
    const offlineUsers = users.filter(u => !u.isOnline);

    return (
        <Card
            style={{
                height: '100%',
                borderRadius: 0,
                borderLeft: isMobile ? 'none' : '1px solid var(--gray-6)',
                overflow: 'hidden'
            }}
        >
            <Box p="3" style={{ borderBottom: '1px solid var(--gray-6)' }}>
                <Flex justify="between" align="center">
                    <Text weight="bold">
                        Members ({users.length})
                    </Text>
                    <Flex gap="2">
                        {isMobile && onShowSidebar && (
                            <IconButton
                                size="1"
                                variant="ghost"
                                onClick={onShowSidebar}
                            >
                                <HamburgerMenuIcon />
                            </IconButton>
                        )}
                        <IconButton
                            size="1"
                            variant="ghost"
                            onClick={onClose}
                        >
                            <Cross2Icon />
                        </IconButton>
                    </Flex>
                </Flex>
                <TextField.Root
                    placeholder="Search members..."
                    size="1"
                    mt="2"
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon />
                    </TextField.Slot>
                </TextField.Root>
            </Box>

            <ScrollArea style={{ height: 'calc(100% - 80px)' }}>
                <Flex direction="column">
                    <Box p="2" style={{ backgroundColor: 'var(--gray-2)' }}>
                        <Text size="1" color="gray" weight="medium">
                            Online ({onlineCount})
                        </Text>
                    </Box>
                    {onlineUsers.map(user => (
                        <Flex
                            key={user.id}
                            align="center"
                            gap="2"
                            p="2"
                            style={{ borderBottom: '1px solid var(--gray-3)' }}
                        >
                            <Avatar
                                size="1"
                                fallback={user.name.charAt(0)}
                                radius="full"
                            />
                            <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                                <Text size="2" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user.name}
                                </Text>
                                <Text size="1" color="gray">Online now</Text>
                            </Flex>
                            <Box
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--green-9)'
                                }}
                            />
                        </Flex>
                    ))}

                    <Box p="2" style={{ backgroundColor: 'var(--gray-2)' }}>
                        <Text size="1" color="gray" weight="medium">
                            Offline ({users.length - onlineCount})
                        </Text>
                    </Box>
                    {offlineUsers.map(user => (
                        <Flex
                            key={user.id}
                            align="center"
                            gap="2"
                            p="2"
                            style={{ borderBottom: '1px solid var(--gray-3)' }}
                        >
                            <Avatar
                                size="1"
                                fallback={user.name.charAt(0)}
                                radius="full"
                                color="gray"
                            />
                            <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                                <Text size="2" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user.name}
                                </Text>
                                <Text size="1" color="gray">Last seen {user.lastSeen}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </ScrollArea>
        </Card>
    );
}