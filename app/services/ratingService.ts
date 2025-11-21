// app/services/ratingService.ts

export interface RatingStats {
  averageRating: number;
  totalRating: number;
  rantingDistribution: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

export interface RatingItem {
  id: string;
  rating: number;
  label: string;
}

export interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    rantings: RatingItem;
    stats: RatingStats;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

const BASE_URL = "https://backend-ts-lemon.vercel.app/api/ranting";

export const ratingService = {
  async submitRating(rating: number): Promise<RatingResponse> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error(`POST failed: ${response.status}`);
    }

    return response.json();
  },

  async getRating(): Promise<RatingResponse> {
    const response = await fetch(BASE_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`GET failed: ${response.status}`);
    }

    return response.json();
  },
};
