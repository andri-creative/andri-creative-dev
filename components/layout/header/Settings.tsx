"use client";

import { GearIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Box,
  IconButton,
  Popover,
  Text,
  Flex,
  RadioGroup,
  Button,
  Separator,
} from "@radix-ui/themes";
import { useThemeMode } from "@/components/ThemeProvider";
import Link from "next/link";

type AccentColor = "blue" | "green" | "red" | "purple" | "orange";
type GrayColor = "gray" | "mauve" | "slate" | "sage" | "olive";

export default function Settings() {
  const {
    mode,
    toggleMode,
    accentColor,
    grayColor,
    setAccentColor,
    setGrayColor,
  } = useThemeMode();

  const accentColors: { value: AccentColor; label: string }[] = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
    // { value: "yellow", label: "Yellow" },
  ];

  const grayColors: { value: GrayColor; label: string }[] = [
    { value: "gray", label: "Gray" },
    { value: "mauve", label: "Mauve" },
    { value: "slate", label: "Slate" },
    { value: "sage", label: "Sage" },
    { value: "olive", label: "Olive" },
  ];

  return (
    <Box>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton size="3" radius="full" variant="soft">
            <GearIcon />
          </IconButton>
        </Popover.Trigger>

        <Popover.Content
          style={{
            maxWidth: "280px",
            padding: "var(--space-4)",
          }}
        >
          {/* Theme Mode */}
          <Box mb="5">
            <Text as="div" size="2" weight="bold" mb="3">
              Theme Mode
            </Text>
            <Button
              onClick={toggleMode}
              variant="soft"
              size="2"
              style={{ width: "100%" }}
            >
              <Flex gap="2" align="center">
                {mode === "light" ? (
                  <SunIcon width="16" height="16" />
                ) : (
                  <MoonIcon width="16" height="16" />
                )}
                <Text>{mode === "light" ? "Light Mode" : "Dark Mode"}</Text>
              </Flex>
            </Button>
          </Box>

          {/* Accent Color */}
          <Box mb="5">
            <Text as="div" size="2" weight="bold" mb="3">
              Accent color
            </Text>
            <RadioGroup.Root
              value={accentColor}
              onValueChange={(val: string) =>
                setAccentColor(val as AccentColor)
              }
            >
              <Flex gap="3" wrap="wrap">
                {accentColors.map((color) => (
                  <RadioGroup.Item key={color.value} value={color.value} hidden>
                    <Box
                      style={{
                        borderRadius: "50%",
                        padding: "0",
                        width: "28px",
                        height: "28px",
                        backgroundColor: `var(--${color.value}-9)`,
                        boxShadow:
                          accentColor === color.value
                            ? `0 0 0 2px var(--${color.value}-9)`
                            : "none",
                        cursor: "pointer",
                      }}
                    />
                  </RadioGroup.Item>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Box>

          {/* Gray Color */}
          <Box>
            <Text as="div" size="2" weight="bold" mb="3">
              Gray color
            </Text>
            <RadioGroup.Root
              value={grayColor}
              onValueChange={(val: string) => setGrayColor(val as GrayColor)}
            >
              <Flex gap="3" wrap="wrap">
                {grayColors.map((color) => (
                  <RadioGroup.Item key={color.value} value={color.value} hidden>
                    <Box
                      style={{
                        borderRadius: "50%",
                        padding: "0",
                        width: "28px",
                        height: "28px",
                        backgroundColor: `var(--${color.value}-9)`,
                        boxShadow:
                          grayColor === color.value
                            ? `0 0 0 2px var(--${color.value}-9)`
                            : "none",
                        cursor: "pointer",
                      }}
                    />
                  </RadioGroup.Item>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Box>
          <Box mt="5" mb="5">
            <Separator orientation="horizontal" size="4" />
          </Box>
          <Box mb="3">
            <Link href="/admin" style={{
              cursor: "pointer",
            }}>
              <Button>
                Admin
              </Button>
            </Link>
          </Box>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
}
