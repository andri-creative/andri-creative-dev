
import { Box, Card } from "@radix-ui/themes";
import Achievements from "@/components/achievements/achievements"

import { getAllDashboard } from "@/lib/gelAllDashboard";

export default async function AchievementsPage() {

    const data = await getAllDashboard();

    const achievements = data?.dashboard?.achievements?.achievement || [];

    return (
        <Box>
            <Card mb="var(--space-4)" style={{
                backgroundColor: "var(--gray-1)",
                border: "1px solid var(--gray-6)",
                overflow: "hidden",
                position: "relative"
            }}>
                <Achievements achievements={achievements} />
            </Card>
        </Box>
    );
}