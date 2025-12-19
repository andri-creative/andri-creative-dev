"use client";

import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Card,
    Tooltip,
    IconButton,
} from "@radix-ui/themes";
import {
    PersonIcon,
    EnterIcon,
    HamburgerMenuIcon,
} from "@radix-ui/react-icons";

interface ChatHeaderProps {
    roomName: string;
    totalMembers: number;
    onlineCount: number;
    showMemberList: boolean;
    isMobile: boolean;
    onToggleMemberList: () => void;
    onToggleSidebar?: () => void;
}

export default function ChatHeader({
    roomName,
    totalMembers,
    onlineCount,
    showMemberList,
    isMobile,
    onToggleMemberList,
    onToggleSidebar,
}: ChatHeaderProps) {
    return (
        <Card
            style={{
                borderRadius: 0,
                borderBottom: '1px solid var(--gray-6)',
                padding: '12px 16px'
            }}
        >
            <Flex justify="between" align="center">
                <Flex align="center" gap="3" style={{ minWidth: 0 }}>
                    {isMobile && onToggleSidebar && (
                        <IconButton
                            size="1"
                            variant="ghost"
                            onClick={onToggleSidebar}
                        >
                            <HamburgerMenuIcon />
                        </IconButton>
                    )}
                    <Avatar
                        size={{ initial: "1", sm: "2" }}
                        fallback="#"
                        radius="small"
                        color="green"
                    />
                    <Box style={{ minWidth: 0 }}>
                        <Text weight="bold" style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {roomName}
                        </Text>
                        <Flex align="center" gap="2" wrap="wrap">
                            <Flex align="center" gap="1">
                                <PersonIcon width={12} height={12} />
                                <Text size="1" color="gray">{totalMembers} members</Text>
                            </Flex>
                            <Box style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--gray-6)',
                                display: isMobile ? 'none' : 'block'
                            }} />
                            <Flex align="center" gap="1">
                                <Box
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--green-9)'
                                    }}
                                />
                                <Text size="1" color="gray">{onlineCount} online</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>

                <Flex gap="2">
                    <Tooltip content="Show/Hide Members">
                        <IconButton
                            size={{ initial: "1", sm: "2" }}
                            variant={showMemberList ? "soft" : "outline"}
                            onClick={onToggleMemberList}
                        >
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                    <Button size={{ initial: "1", sm: "2" }} variant="soft">
                        <EnterIcon />
                        <Text as="span" style={{ display: isMobile ? 'none' : 'inline' }}>
                            Invite
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}