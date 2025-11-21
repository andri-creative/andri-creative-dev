
import {
    Box,
    Flex,
    Text,
    Separator,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import {
    FiStar,
} from "react-icons/fi";

import { useRating } from "@/app/hooks/useRating"

export default function ResultRating() {
    const { stats, isLoading } = useRating();
    // if (isLoading) return <Text>Loading...</Text>;
    console.log(isLoading)

    const distribution = stats?.rantingDistribution
        ? Object.entries(stats.rantingDistribution).map(([stars, count]) => ({
            stars: Number(stars),
            count,
            percentage: stats.totalRating
                ? Math.round((count / stats.totalRating) * 100)
                : 0,
        }))
        : [];

    const displayStats = stats || {
        averageRating: 0,
        totalRating: 0,
        rantingDistribution: {}
    };

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Box
                    p="4"
                    mt="4"
                    style={{
                        backgroundColor: "var(--gray-a2)",
                        borderRadius: "8px",
                        margin: "16px",
                        marginTop: "auto",
                    }}
                >
                    {/* Header */}
                    <Text size="4" weight="bold" mb="4" as="div">
                        RATING STATISTICS
                    </Text>

                    {/* Average Rating */}
                    <Flex justify="between" align="center" mb="4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <Text size="2" weight="medium" color="gray">
                                Average
                            </Text>
                            <Flex align="center" gap="2" mt="1">
                                <Text size="5" weight="bold">
                                    {displayStats.averageRating.toFixed(1)}/5
                                </Text>
                                <Flex align="center" gap="1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FiStar
                                            key={star}
                                            size={14}
                                            color={
                                                star <= Math.round(displayStats.averageRating)
                                                    ? "#FFD700"
                                                    : "#E5E7EB"
                                            }
                                            fill={
                                                star <= Math.round(displayStats.averageRating)
                                                    ? "#FFD700"
                                                    : "none"
                                            }
                                        />
                                    ))}
                                </Flex>
                            </Flex>
                            <Text size="1" color="gray" mt="1">
                                {displayStats?.totalRating ?? 0} ratings
                            </Text>
                        </motion.div>
                    </Flex>

                    <Separator size="4" mb="4" />

                    {/* Distribution */}
                    <Text size="3" weight="bold" mb="3" as="div">
                        DISTRIBUTION
                    </Text>

                    {distribution
                        .sort((a, b) => Number(b.stars) - Number(a.stars))
                        .map((rating, index) => (
                            <motion.div
                                key={rating.stars}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                            >
                                <Flex align="center" gap="3" mb="2">
                                    {/* Label Stars */}
                                    <Flex align="center" gap="1" style={{ width: "20px" }}>
                                        <Text size="2" weight="medium">
                                            {rating.stars}
                                        </Text>
                                        <FiStar size={12} color="#FFD700" fill="#FFD700" />
                                    </Flex>

                                    {/* Progress Wrapper */}
                                    <Box
                                        style={{ flex: 1, position: "relative", height: "6px" }}
                                    >
                                        <Box
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "9999px",
                                                background: "var(--gray-a5)",
                                            }}
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${rating.percentage}%` }}
                                            transition={{ duration: 2.0, ease: "easeOut" }}
                                            style={{
                                                height: "100%",
                                                borderRadius: "9999px",
                                                background: "#00AEEF",
                                            }}
                                        />
                                    </Box>

                                    {/* Percentage */}
                                    <Flex gap="2" align="center" style={{ width: "50px" }}>
                                        <Text size="2" weight="medium">
                                            {rating.percentage}%
                                        </Text>
                                    </Flex>
                                </Flex>
                            </motion.div>
                        ))}
                </Box>
            </motion.div>
        </Box>
    )
}