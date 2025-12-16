import { Box } from "@radix-ui/themes";

import ProjectDetailComponent from "@/components/project/projectDetail";
import type { ProjectStats } from "@/types/project";
import { slugify } from "@/lib/slugify";

import { getAllDashboard } from "@/lib/gelAllDashboard";
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;

  const data = await getAllDashboard();

  const projectById = data?.dashboard?.project?.projects.find(
    (item: ProjectStats) => slugify(item.title) === slug
  );

  if (!projectById) {
    return (
      <Box>
        <div>Achievement not found</div>
      </Box>
    );
  }

  return (
    <Box>
      <ProjectDetailComponent project={projectById} />
    </Box>
  );
}
