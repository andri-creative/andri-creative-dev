

import ProfileBlock from "@/components/home/ProfileBlock";
import { Box } from "@radix-ui/themes";
import SkillsMatrix from "@/components/home/SkillsMatrix";
import FeaturedSections from "@/components/home/FeaturedSections";
import { getAllDashboard } from "@/lib/gelAllDashboard";

export default async function HomePage() {

  const data = await getAllDashboard();
  // console.log('ini', data)
  // const { words, skills } = dashboard;
  // console.log(skills);

  const dataWords = data?.words || []
  const dataSkills = data?.skills || []



  return (
    <Box width="100%" style={{ margin: 0, padding: "var(--space-2)" }}>
      <ProfileBlock dataWords={dataWords} />
      <SkillsMatrix skills={dataSkills} />
      <FeaturedSections />
    </Box>
  );
}
