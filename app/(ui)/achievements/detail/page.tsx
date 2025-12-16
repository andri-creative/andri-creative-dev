// import { Box } from "@radix-ui/themes";
// import { getAllDashboard } from "@/lib/gelAllDashboard";
// import type { AchievementStats } from "@/types/achievement"
// import AchievementDetail from "@/components/achievements/achievementsDetail";
// interface PageProps {
//     params: {
//         id: string;
//     };
// }

// export default async function AchievementDetailPage({ params }: PageProps) {
//     const { id } = await params

//     const data = await getAllDashboard();

//     const achievement = data?.dashboard?.achievements?.achievement.find(
//         (item: AchievementStats) => item.id === id
//     );

//     if (!achievement) {
//         return (
//             <Box>
//                 <div>Achievement not found</div>
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             <AchievementDetail achievement={achievement} />
//         </Box>
//     );
// }
