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
export default function User() {
  return (
    <Box>
      <Heading size="7" align="center" mb="2" mt="1">
        Welcome
      </Heading>
      <Flex align="center" justify="between" pb="4">
        <Box>
          <Badge radius="full" color="green">
            <span
              style={{
                width: 8,
                height: 8,
                backgroundColor: "green",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: 6,
              }}
            ></span>
            Hire Me!
          </Badge>
        </Box>
        <Box>
          <IconButton size="2" radius="full" color="green">
            <AiOutlineSpotify />
          </IconButton>
        </Box>
      </Flex>
      <Flex align="center" justify="center">
        <Box>
          <Avatar
            size="7"
            radius="full"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
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
