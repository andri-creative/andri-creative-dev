export interface RatingDistribution {
  [key: string]: number;
}

export interface RatingStats {
  averageRating: number;
  totalRating: number;
  rantingDistribution: RatingDistribution;
}

export interface AchievementStats {
  id: string;
  title: string;
  src: string;
  issuer: string;
  label: string;
  issueDate: string;
  description: string;
  category: string;
  level: string;
  tags: string[];
  status: string;
  pinned: boolean;
}

export interface AlbumStats {
  id: string;
  title: string;
  width: number;
  height: number;
  url: string;
  createdAt: number;
}

export interface ProjectStats {
  id: string;
  title: string;
  description: string;
  image: string;
  status: boolean;
  pinned: boolean;
  techStack: string[];
  role: string;
  demoUrl?: string;
  repoUrl?: string;
  features: string[];
  tools: {
    id: string;
    title: string;
    image: string;
    url: string;
  }[];
}

export interface DashboardData {
  rantings: {
    stats: RatingStats;
  };
  achievements: {
    achievement: AchievementStats[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  };
  myAlbum: AlbumStats[];
  project: {
    projects: ProjectStats[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  };
}

export async function getDashboard(): Promise<DashboardData> {
  const startTime = Date.now();

  try {
    const res = await fetch(
      "https://backend-ts-lemon.vercel.app/api/dashboard",
      {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    const endTime = Date.now();
    console.log(`⏱️ Response time: ${endTime - startTime}ms`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    return data as DashboardData;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
}
