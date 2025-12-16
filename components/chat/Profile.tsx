"use client";

import { Box, Flex, Text, Avatar, Button, Popover } from "@radix-ui/themes";
import { useAuth } from "@/context/AuthContext";

export default function ProfileChat() {
  const { user, logout } = useAuth();

  console.log("🚀 ~ ProfileChat ~ user:", user);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      {user && (
        <Flex
          justify="between"
          align="center"
          mb="4"
          pb="4"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <Flex align="center" gap="3">
            <Popover.Root>
              <Popover.Trigger>
                <Flex align="center" gap="3">
                  <Avatar
                    size="2"
                    src={user?.avatar || undefined}
                    fallback={user?.name?.charAt(0) || "U"}
                    radius="full"
                  />

                  <Box>
                    <Text size="2" weight="bold">
                      {user?.name}
                    </Text>
                  </Box>
                </Flex>
              </Popover.Trigger>

              <Popover.Content width="360px">
                <Flex direction="column" gap="3">
                  <Text size="2" weight="bold">
                    {user?.name}
                  </Text>
                  <Text size="2" weight="bold">
                    {user?.email}
                  </Text>
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Flex>
          <Button
            style={{
              cursor: "pointer",
            }}
            size="1"
            variant="soft"
            color="red"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      )}
    </Box>
  );
}
