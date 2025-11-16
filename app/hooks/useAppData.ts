"use client";

import { useEffect, useState } from "react";
import type { WordItem } from "@/lib/words";
import type { SkillItem } from "@/lib/skills";
import type {
  AchievementStats,
  AlbumStats,
  ProjectStats,
  RatingStats,
} from "@/lib/getDashboard";
// import { getWords, getSkills, getDashboard } from "@/lib";
import { getDashboard } from "@/lib/getDashboard";
import { getWords } from "@/lib/words";
import { getSkills } from "@/lib/skills";

export function useAppData() {
  const [words, setWords] = useState<WordItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementStats[]>([]);
  const [myAlbum, setMyAlbum] = useState<AlbumStats[]>([]);
  const [projects, setProjects] = useState<ProjectStats[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [wordsLoading, setWordsLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [myAlbumLoading, setMyAlbumLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [achievementsPagination, setAchievementsPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 0,
  });

  const [projectsPagination, setProjectsPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 0,
  });

  // ⭐ TAMBAHKAN FUNCTION BARU INI
  const updateRatingStats = (newStats: RatingStats) => {
    setRatingStats(newStats);
    console.log("📊 Stats updated from backend response:", newStats);
  };

  const refreshRating = async (newRating?: number) => {
    console.log("🔄 refreshRating dipanggil dengan rating:", newRating);

    // OPTIMISTIC UPDATE: Langsung update UI dengan data baru
    if (newRating && ratingStats) {
      const optimisticStats = calculateOptimisticStats(ratingStats, newRating);
      setRatingStats(optimisticStats);
      console.log("⚡ Optimistic update:", optimisticStats);
      return;
    }
  };

  const calculateOptimisticStats = (
    currentStats: RatingStats,
    newRating: number
  ): RatingStats => {
    const newTotalRating = currentStats.totalRating + 1;
    const newAverageRating =
      (currentStats.averageRating * currentStats.totalRating + newRating) /
      newTotalRating;

    // Update distribution
    const newDistribution = { ...currentStats.rantingDistribution };
    const ratingKey = newRating.toString();
    newDistribution[ratingKey] = (newDistribution[ratingKey] || 0) + 1;

    return {
      averageRating: parseFloat(newAverageRating.toFixed(1)),
      totalRating: newTotalRating,
      rantingDistribution: newDistribution,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refreshTrigger > 0) {
          setLoading(true);
        }

        setWordsLoading(true);
        setSkillsLoading(true);
        setAchievementsLoading(true);
        setMyAlbumLoading(true);
        setProjectsLoading(true);

        const [wordData, skillData, dashboardData] = await Promise.all([
          getWords(),
          getSkills(),
          getDashboard(),
        ]);

        setWords(wordData);
        setSkills(skillData);
        setRatingStats(dashboardData.rantings.stats);
        setAchievements(dashboardData.achievements.achievement);
        setAchievementsPagination(dashboardData.achievements.pagination);
        setMyAlbum(dashboardData.myAlbum);
        setProjects(dashboardData.project.projects);
        setProjectsPagination(dashboardData.project.pagination);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setRatingStats(null);
      } finally {
        setLoading(false);
        setWordsLoading(false);
        setSkillsLoading(false);
        setAchievementsLoading(false);
        setMyAlbumLoading(false);
        setProjectsLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  return {
    words,
    skills,
    achievements,
    myAlbum,
    projects,
    ratingStats,
    wordsLoading,
    skillsLoading,
    achievementsLoading,
    myAlbumLoading,
    projectsLoading,
    loading,
    achievementsPagination,
    projectsPagination,
    updateRatingStats,
    refreshRating,
  };
}
