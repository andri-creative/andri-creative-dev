"use client";

import { useState } from "react";
import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Card,
    ScrollArea,
    Badge,
    Tabs,
    TextField,
    DropdownMenu,
    Separator,
    IconButton
} from "@radix-ui/themes";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    GearIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";

interface Room {
    id: number;
    name: string;
    members: number;
    isActive: boolean;
    unread: number;
}

interface User {
    id: number;
    name: string;
    avatar?: string;
    isOnline: boolean;
}

interface SidebarProps {
    user: User;
    rooms: Room[];
    activeRoom: number;
    onRoomSelect: (roomId: number) => void;
    isMobile?: boolean;
    onClose?: () => void;
    onLogout?: () => void;
}

export default function Sidebar({
    user,
    rooms,
    activeRoom,
    onRoomSelect,
    isMobile = false,
    onClose,
    onLogout,
}: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
        if (isMobile && onClose) {
            onClose();
        }
    };

    console.log(user);
    console.log("🚀 ~ Sidebar ~ user:", user?.avatar)

    return (
        <Card
            style={{
                height: '100%',
                borderRadius: 0,
                borderRight: '1px solid var(--gray-6)',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <Box p={{ initial: "3", sm: "4" }} pb="3">
                {!isMobile && (
                    <Flex justify="between" align="center" mb="4">
                        <Text size={{ initial: "4", md: "5" }} weight="bold">
                            Chat Grub
                        </Text>
                        <Button size="1" variant="soft">
                            <PlusIcon />
                            New
                        </Button>
                    </Flex>
                )}

                <TextField.Root
                    placeholder="Search rooms..."
                    size={{ initial: "1", sm: "2" }}
                    mb="4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon />
                    </TextField.Slot>
                </TextField.Root>

                <Tabs.Root defaultValue="rooms" >
                    <Tabs.List style={{ flexWrap: 'wrap' }}>
                        <Tabs.Trigger value="rooms" style={{ flex: 1, minWidth: '80px' }}>
                            Rooms
                        </Tabs.Trigger>
                        <Tabs.Trigger value="direct" style={{ flex: 1, minWidth: '80px' }}>
                            Direct
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="rooms">
                            <ScrollArea style={{ height: '300px' }}>
                                <Flex direction="column" gap="2">
                                    {filteredRooms.map(room => (
                                        <motion.div
                                            key={room.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Flex
                                                align="center"
                                                gap="3"
                                                p="2"
                                                style={{
                                                    borderRadius: 'var(--radius-2)',
                                                    cursor: 'pointer',
                                                    backgroundColor: activeRoom === room.id ? 'var(--gray-3)' : 'transparent',
                                                }}
                                                onClick={() => {
                                                    onRoomSelect(room.id);
                                                    if (isMobile && onClose) onClose();
                                                }}
                                            >
                                                <Avatar
                                                    size={{ initial: "1", sm: "2" }}
                                                    fallback="#"
                                                    radius="small"
                                                    color={room.isActive ? "green" : "gray"}
                                                />
                                                <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                                                    <Flex align="center" gap="2">
                                                        <Text
                                                            size={{ initial: "1", sm: "2" }}
                                                            weight="medium"
                                                            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                        >
                                                            {room.name}
                                                        </Text>
                                                        {room.unread > 0 && (
                                                            <Badge color="red" size="1">
                                                                {room.unread}
                                                            </Badge>
                                                        )}
                                                    </Flex>
                                                    <Text size={{ initial: "1", sm: "1" }} color="gray">
                                                        {room.members} members
                                                    </Text>
                                                </Flex>
                                                {room.isActive && (
                                                    <Box
                                                        style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            backgroundColor: 'var(--green-9)',
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                )}
                                            </Flex>
                                        </motion.div>
                                    ))}
                                </Flex>
                            </ScrollArea>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Box>

            <Separator size="4" />

            {/* User Profile */}
            <Box p={{ initial: "3", sm: "4" }}>
                <Flex align="center" gap="3">
                    <Avatar
                        size={{ initial: "1", sm: "2" }}
                        src={user.avatar}
                        fallback={user?.name?.charAt(0)}
                        radius="full"
                    />
                    <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                        <Text
                            size={{ initial: "1", sm: "2" }}
                            weight="bold"
                            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                            {user?.name}
                        </Text>
                        <Flex align="center" gap="1">
                            <Box
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--green-9)',
                                    flexShrink: 0
                                }}
                            />
                            <Text size={{ initial: "1", sm: "1" }} color="gray">
                                Online
                            </Text>
                        </Flex>
                    </Flex>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <IconButton size={{ initial: "1", sm: "1" }} variant="ghost">
                                <GearIcon />
                            </IconButton>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>Settings</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            {onLogout && (
                                <DropdownMenu.Item
                                    color="red"
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </DropdownMenu.Item>
                            )}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Box>
        </Card>
    );
}