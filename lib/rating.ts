// lib/rating.ts
export type RatingInput = {
  averageRating?: number;
  totalRating?: number;
  rantingDistribution?: Record<string, number>;
};

export type RatingStats = {
  averageRating: number;
  totalRating: number;
  rantingDistribution: Record<string, number>;
};

export function getRatingStats(data: RatingInput): RatingStats {
  return {
    averageRating: data.averageRating || 0,
    totalRating: data.totalRating || 0,
    rantingDistribution: data.rantingDistribution || {},
  };
}

// Tambah rating (opsional, jika kamu ingin POST)
// export async function addRating(payload: {
//   user: string;
//   value: number;
//   comment?: string;
// }) {
//   const res = await api.post("/rating", payload);
//   return res.data;
// }
