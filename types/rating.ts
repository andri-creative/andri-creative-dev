// types/rating.ts

export interface RatingDistribution {
  [key: string]: number;
}

export interface RatingStats {
  averageRating: number;
  totalRating: number;
  rantingDistribution: RatingDistribution;
}
