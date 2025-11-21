// types/dashboard/dashboard.ts

// Import tipe-tipe dari file lain
import { RatingStats } from "../rating";
import { AchievementStats } from "../achievement";
import { AlbumStats } from "../album";
import { ProjectStats } from "../project";
import { PaginationStats } from "../core/common";

export interface DashboardData {
  // Rating
  rantings: {
    stats: RatingStats;
  };

  // Achievements
  achievements: {
    achievement: AchievementStats[];
    pagination: PaginationStats;
  };

  // Album
  myAlbum: AlbumStats[];

  // project
  project: {
    projects: ProjectStats[];
    pagination: PaginationStats;
  };
}
