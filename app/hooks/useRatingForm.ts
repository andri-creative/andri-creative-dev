// hooks/useRatingForm.ts
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
interface RatingFormValues {
  rating: number;
}

interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    label: string;
    rating: number;
    createdAt: string;
  };
  stats?: {
    averageRating: number;
    totalRating: number;
    rantingDistribution: {
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
    };
  };
}

interface UseRatingFormProps {
  onSubmit: (values: RatingFormValues) => Promise<RatingResponse>;
}

export function useRatingForm({ onSubmit }: UseRatingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      rating: 0,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      console.log("Form values:", value);

      try {
        const result = await onSubmit(value);
        console.log("✅ Form submission result:", result);
        return result; // ⭐ RETURN THE RESULT
      } catch (error) {
        console.error("Form submission error:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return {
    form,
    isSubmitting,
  };
}
