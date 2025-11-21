// hooks/useRatingForm.ts
"use client";

import { useForm } from "@tanstack/react-form";
import { ratingService } from "@/app/services/ratingService";
import type { RatingResponse } from "@/app/services/ratingService";

export function useRatingForm(onSuccess?: (stats: RatingResponse) => void) {
  const form = useForm({
    defaultValues: {
      rating: 0,
    },

    onSubmit: async ({ value }) => {
      const stats = await ratingService.submitRating(value.rating);

      if (onSuccess) onSuccess(stats);
      return stats;
    },
  });

  return {
    form,
    isSubmitting: form.state.isSubmitting,
  };
}
