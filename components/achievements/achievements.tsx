"use client";

import {
  Box,
  Card,
  Grid,
  Heading,
  Text,
  Inset,
  Flex,
  Badge,
  Button,
} from "@radix-ui/themes";
import Image from "next/image";
import { GiAchievement } from "react-icons/gi";
import { useThemeMode } from "@/components/ThemeProvider";
import { TbPinned } from "react-icons/tb";
import type { AchievementStats } from "@/types/achievement";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

interface AchievementsProps {
  achievements: AchievementStats[];
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Achievements({ achievements }: AchievementsProps) {
  const { accentColor } = useThemeMode();
  const router = useRouter();

  const sortedAchievements = useMemo(() => {
    if (!Array.isArray(achievements)) return [];
    return [...achievements].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return Number(b.pinned) - Number(a.pinned);
      }

      const dateA = new Date(a.issueDate.split(",")[0]);
      const dateB = new Date(b.issueDate.split(",")[0]);

      return dateB.getTime() - dateA.getTime();
    });
  }, [achievements]);

  const handleViewDetails = (title: string) => {
    const slug = slugify(title);
    router.push(`/achievements/${slug}`);
  };

  function formatAchievementDate(dateString: string): string {
    if (dateString.includes(",")) {
      const [first, second] = dateString.split(",");
      const [year, month] = first.split("-");
      const start = new Date(`${year}-${month}-${first.split("-")[2]}`);
      const end = new Date(`${year}-${month}-${second}`);

      const sameMonth = start.getMonth() === end.getMonth();
      const sameYear = start.getFullYear() === end.getFullYear();
      const startDay = start.getDate();
      const endDay = end.getDate();
      const monthName = start.toLocaleString("id-ID", { month: "short" });
      const yearName = start.getFullYear();

      if (sameMonth && sameYear) {
        return `${startDay},${endDay} ${monthName} ${yearName}`;
      } else {
        const endFormatted = end.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return `${startDay} ${monthName} ${yearName}–${endFormatted}`;
      }
    } else {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  return (
    <>
      <Box
        p={{
          initial: "var(--space-1)",
          sm: "var(--space-3)",
          md: "var(--space-6)",
        }}
      >
        <Box mb="5">
          <Heading
            size="8"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <GiAchievement
              style={{ fontSize: "inherit", verticalAlign: "middle" }}
            />
            <Text style={{ margin: 0 }}>Achievements</Text>
          </Heading>
          <Text size="3" color="gray">
            A curated collection of certificates and badges I&#39;ve earned
            throughout my professional and academic journey.
          </Text>
        </Box>

        <Grid
          columns={{ initial: "1", sm: "2", md: "3", xl: "4" }}
          gap="var(--space-4)"
        >
          {sortedAchievements.map((i) => (
            <Box maxWidth="440px" key={i.id}>
              <Card size="2" style={{ position: "relative" }}>
                <Inset clip="padding-box" side="top" pb="current">
                  <Image
                    src={i.src}
                    alt={`${i.id} certificate ${i.title}`}
                    width={400}
                    height={240}
                    style={{
                      display: "block",
                      objectFit: "contain",
                      width: "100%",
                      height: "auto",
                      backgroundColor: "var(--gray-5)",
                    }}
                  />
                </Inset>
                {i.pinned === true && (
                  <Box
                    position="absolute"
                    top="2"
                    right="3"
                    style={{
                      backgroundColor: `var(--${accentColor}-4)`,
                      padding: "6px",
                      borderRadius: "50%",
                      display: "flex",
                      cursor: "pointer",
                    }}
                  >
                    <TbPinned size={16} color={`var(--${accentColor}-9)`} />
                  </Box>
                )}
                <Flex direction="column" gap="3" mt="2">
                  <Flex gap="2" align="center">
                    <Badge color="green" size="1" variant="soft">
                      {capitalize(i.category)}
                    </Badge>
                    {i.status && (
                      <Badge color="blue" size="1">
                        Verified
                      </Badge>
                    )}
                  </Flex>

                  <Heading
                    as="h3"
                    size="4"
                    weight="bold"
                    style={{
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {i.title.length > 60
                      ? i.title.substring(0, 60) + "..."
                      : i.title}
                  </Heading>

                  <Text
                    as="p"
                    size="2"
                    weight="medium"
                    color="blue"
                    style={{
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {i.issuer.length > 60
                      ? i.issuer.substring(0, 60) + "..."
                      : i.issuer}
                  </Text>

                  <Flex gap="3">
                    <Text size="1" color="gray">
                      📅 {formatAchievementDate(i.issueDate)}
                    </Text>
                    <Text size="1" color="gray">
                      ⭐ {capitalize(i.level)}
                    </Text>
                  </Flex>

                  <Flex gap="1" wrap="wrap">
                    {i.tags?.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        size="1"
                        variant="outline"
                        color="gray"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                  <Flex justify="end" mt="2">
                    <Button
                      size="2"
                      variant="soft"
                      onClick={() => handleViewDetails(i.title)}
                    >
                      View Details
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}
