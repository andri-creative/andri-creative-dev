// app/hooks/useSubmitRating.ts
"use client";

import { useState } from "react";
import { ratingService } from "@/app/services/ratingService";
import type { RatingResponse } from "@/app/services/ratingService";

export function useSubmitRating() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RatingResponse | null>(null);

  const submit = async (rating: number) => {
    setLoading(true);

    try {
      // POST
      const res = await ratingService.submitRating(rating);
      setResult(res);

      // Setelah submit → GET stats terbaru
      const latest = await ratingService.getRating();
      return latest.data?.stats;
    } catch (error) {
      console.error("❌ Error submitting rating:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, result };
}
