export interface RatingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    label: string;
    rating: number;
    createdAt: string;
  };
  stats: {
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

export const ratingService = {
  async submitRating(rating: number): Promise<RatingResponse> {
    const response = await fetch(
      "https://backend-ts-lemon.vercel.app/api/ranting",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("📊 Backend POST response:", result);
    return result; // ⭐ PASTIKAN RETURN RESULT, BUKAN void
  },
};
