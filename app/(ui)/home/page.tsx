"use client";

import ProfileBlock from "@/components/home/ProfileBlock";
import { Box } from "@radix-ui/themes";
import { useAppContext } from "@/app/contexts/AppContext";
import SkillsMatrix from "@/components/home/SkillsMatrix";
import FeaturedSections from "@/components/home/FeaturedSections";

export default function HomePage() {
  const { words, skills, achievements } = useAppContext();

  // console.log(skills);

  return (
    <Box width="100%" style={{ margin: 0, padding: "var(--space-2)" }}>
      <ProfileBlock words={words} />
      <SkillsMatrix skills={skills} />
      <FeaturedSections />
    </Box>
  );
}
