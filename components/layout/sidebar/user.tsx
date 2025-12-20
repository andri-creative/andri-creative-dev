"use client";

import {
  Box,
  Avatar,
  Flex,
  IconButton,
  Badge,
  Text,
  Heading,
  Tooltip,
} from "@radix-ui/themes";
import React from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import Image from "next/image";
import { useThemeMode } from "@/components/ThemeProvider";
import Link from "next/link";
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
          <Link href="/">
            <Tooltip
              style={{
                color: `var(--${accentColor}-4)`,
              }}
              content="Spotify"
            >
              <IconButton radius="full" style={{ cursor: "pointer" }}>
                <AiOutlineSpotify />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      </Flex>
      <Flex align="center" justify="center">
        <Box
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            backgroundImage: "url('/profile/cont.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            marginBottom: 12,
          }}
        />
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
