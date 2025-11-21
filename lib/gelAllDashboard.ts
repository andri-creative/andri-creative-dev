// lib/getAllDashboard.ts
import { getDashboard } from "./getDashboard";
import { getSkills } from "./skills";
import type { DashboardData } from "@/types/dashboard/dashboard";
import type { SkillItem } from "./skills";
import { getWords } from "./words";
import type { WordItem } from "./words";

export interface AllDashboardData {
  dashboard: DashboardData | null;
  skills: SkillItem[];
  words: WordItem[];
}

export async function getAllDashboard(): Promise<AllDashboardData> {
  const [dashboard, skills, words] = await Promise.all([
    getDashboard(),
    getSkills(),
    getWords(),
  ]);

  return {
    dashboard,
    skills,
    words,
  };
}
