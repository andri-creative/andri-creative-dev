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
  pinned: boolean;
  techStack: string[];
  role: string;
  demoUrl?: string;
  repoUrl?: string;
  features: string[];
  tools: ProjectTool[];
}
