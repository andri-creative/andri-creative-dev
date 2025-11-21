
import { Box } from "@radix-ui/themes";
import Project from "@/components/project/project";
import { getAllDashboard } from "@/lib/gelAllDashboard";


export default async function ProjectPage() {

    const data = await getAllDashboard();

    const dataProject = data?.dashboard?.project?.projects || []

    return (
        <Box py="6">
            <Project project={dataProject} />
        </Box>
    );
}
