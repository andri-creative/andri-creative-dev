// types/achievement.ts

export interface AchievementStats {
  id: string;
  title: string;
  src: string;
  issuer: string;
  label: string;
  issueDate: string;
  description: string;
  category: string;
  level: string;
  tags: string[];
  status: string;
  pinned: boolean;
}
