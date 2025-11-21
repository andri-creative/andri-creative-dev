// types/project.ts

export interface ProjectTool {
  id: string;
  title: string;
  image: string;
  url: string;
}

export interface ProjectStats {
  id: string;
  title: string;
  description: string;
  image: string;
  status: boolean;
  createdAt: string;
  demoUrl: string;
  repoUrl: string;
  pinned: boolean;
  role: string;
  techStack: string[];
  tools: {
    id: string;
    title: string;
    image: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
  features: string[];
}
