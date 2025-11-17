'use client'

import {
  Box,
  Avatar,
  Flex,
  IconButton,
  Badge,
  Text,
  Heading,
} from "@radix-ui/themes";
import React from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import Image from "next/image";
import { useThemeMode } from "@/components/ThemeProvider";
export default function User() {

  const { accentColor } = useThemeMode();
  return (
    <Box>
      <Heading size="7" align="center" mb="2" mt="1">
        Welcome
      </Heading>
      <Flex align="center" justify="between" pb="4">
        <Box>
          <Badge radius="full">
            <span
              style={{
                width: 8,
                height: 8,
                backgroundColor: `var(--${accentColor}-9)`,
                borderRadius: "50%",
                display: "inline-block",
                marginRight: 6,
              }}
            ></span>
            Hire Me!
          </Badge>
        </Box>
        <Box>
          <IconButton size="2" radius="full" style={{
            color: `var(--${accentColor}-4)`
          }}>
            <AiOutlineSpotify />
          </IconButton>
        </Box>
      </Flex>
      <Flex align="center" justify="center">
        <Box>
          <Avatar
            size="7"
            radius="full"
            src="/profile/02.webp"
            fallback="A"
            style={{
              objectFit: 'cover',
              objectPosition: "center 90%"
            }}
          />
        </Box>
      </Flex>
      <Flex display="flex" direction="column" align="center" justify="center">
        <Box>
          <Flex align="center" gap="2">
            <Text size="6" weight="bold">
              Andrianto
            </Text>
            <Image
              src="/verified/verifiesd.png"
              alt="Verified"
              width={18}
              height={18}
            />
          </Flex>
        </Box>
        <Text size="2" color="gray">
          &#64;Creative
        </Text>
      </Flex>
    </Box>
  );
}
