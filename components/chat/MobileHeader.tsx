"use client";

import {
    Box,
    Flex,
    Text,
    Avatar,
    IconButton,
} from "@radix-ui/themes";
import {
    HamburgerMenuIcon,
    PersonIcon,
} from "@radix-ui/react-icons";

interface User {
    id: number;
    name: string;
    avatar?: string;
    isOnline: boolean;
}

interface MobileHeaderProps {
    user: User;
    onToggleSidebar: () => void;
    onToggleMemberList: () => void;
    showMemberList: boolean;
}

export default function MobileHeader({
    user,
    onToggleSidebar,
    onToggleMemberList,
    showMemberList,
}: MobileHeaderProps) {
    return (
        <Box style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: 'var(--gray-1)',
            borderBottom: '1px solid var(--gray-6)',
            padding: '12px 16px'
        }}>
            <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                    <IconButton
                        size="2"
                        variant="ghost"
                        onClick={onToggleSidebar}
                    >
                        <HamburgerMenuIcon />
                    </IconButton>
                    <Text weight="bold">Chat Grub</Text>
                </Flex>
                <Flex gap="2">
                    <IconButton
                        size="2"
                        variant={showMemberList ? "soft" : "outline"}
                        onClick={onToggleMemberList}
                    >
                        <PersonIcon />
                    </IconButton>
                    <Avatar
                        size="2"
                        src={user?.avatar}
                        fallback={user?.name?.charAt(0)}
                        radius="full"
                    />
                </Flex>
            </Flex>
        </Box>
    );
}