

import {
    Box
} from "@radix-ui/themes";

import ProjectDetailComponent from "@/components/project/projectDetail";
import type { ProjectStats } from "@/types/project"

import { getAllDashboard } from "@/lib/gelAllDashboard";
interface PageProps {
    params: {
        id: string;
    };
}

export default async function ProjectDetail({ params }: PageProps) {
    const { id } = await params

    const data = await getAllDashboard()

    const projectById = data?.dashboard?.project?.projects.find((item: ProjectStats) => item.id === id)

    if (!projectById) {
        return (
            <Box>
                <div>Achievement not found</div>
            </Box>
        )
    }

    return (
        <Box>
            <ProjectDetailComponent project={projectById} />
        </Box>

    )
}