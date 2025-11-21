"use client";

import useSWR from "swr";
import { ratingService } from "../services/ratingService";
import type { RatingResponse } from "../services/ratingService";

export function useRating() {
  const { data, error, isLoading } = useSWR<RatingResponse>(
    "rating-stats",
    ratingService.getRating,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data?.data?.stats,
    rating: data?.data,
    isLoading,
    error,
  };
}
