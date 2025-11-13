'use client'

import { Box, Card, Heading, Text, Flex, Badge, Button, Grid, Inset, Separator } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "../../layout";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@radix-ui/react-icons";

export default function AchievementDetailPage() {
    const { achievements, achievementsLoading } = useAppContext();
    const router = useRouter();
    const params = useParams();

    // Langsung cari achievement tanpa useEffect
    const achievementId = params?.id as string;
    const achievement = achievements.find(a => a.id === achievementId);

    // Debug
    // console.log('Params ID:', achievementId);
    // console.log('Achievements count:', achievements.length);
    // console.log('Found achievement:', achievement);
    console.log('Achievements Loading:', achievementsLoading);

    if (achievementsLoading && achievements.length === 0) {
        return (
            <Box>
                <Card style={{ padding: "var(--space-6)" }}>
                    <Text>Loading achievement details...</Text>
                </Card>
            </Box>
        );
    }


    if (!achievement) {
        return (
            <Box>
                <Card style={{ padding: "var(--space-6)" }}>
                    <Text>Achievement not found</Text>
                    <Text size="2" color="gray" mt="2">
                        ID: {achievementId}
                    </Text>
                    <Text size="2" color="gray">
                        Available achievements: {achievements.length}
                    </Text>
                    <Button onClick={() => router.push('/achievements')} mt="3">
                        Back to Achievements
                    </Button>
                </Card>
            </Box>
        );
    }

    const formatDate = (dateString: string): string => {
        // jika ada koma, berarti ada 2 tanggal
        if (dateString.includes(',')) {
            const parts = dateString.split(',');

            // ambil base dari tanggal pertama
            const [year, month, day] = parts[0].split('-');

            // deteksi apakah tanggal kedua sudah lengkap (ada tahun-bulan)
            const secondPart = parts[1].includes('-') ? parts[1] : `${year}-${month}-${parts[1]}`;

            const start = new Date(`${year}-${month}-${day}`);
            const end = new Date(secondPart);

            const sameMonth = start.getMonth() === end.getMonth();
            const sameYear = start.getFullYear() === end.getFullYear();

            const startDay = start.getDate();
            const endDay = end.getDate();
            const monthName = start.toLocaleString('id-ID', { month: 'long' });
            const yearName = start.getFullYear();

            if (sameMonth && sameYear) {
                // contoh: 4–5 November 2025
                return `${startDay},${endDay} ${monthName} ${yearName}`;
            } else {
                // contoh: 30 November 2025–1 Desember 2025
                const endFormatted = end.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
                return `${startDay} ${monthName} ${yearName}–${endFormatted}`;
            }
        } else {
            // jika hanya satu tanggal
            return new Date(dateString).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
    };


    return (
        <Box>
            <Card style={{
                padding: "var(--space-6)",
                backgroundColor: "var(--gray-1)",
                border: "1px solid var(--gray-6)"
            }}>
                {/* Back Button */}
                <Button
                    variant="soft"
                    onClick={() => router.push('/achievements')}
                    mb="5"
                >
                    <ArrowLeftIcon width="16" height="16" />
                    Back to Achievements
                </Button>

                <Grid columns={{ initial: '1', md: '2' }} gap="6">
                    {/* Image Section */}
                    <Box>
                        <Card>
                            <Inset clip="padding-box" side="top" pb="current">
                                <Image
                                    src={achievement.src}
                                    alt={achievement.title}
                                    width={600}
                                    height={400}
                                    style={{
                                        display: "block",
                                        objectFit: "contain",
                                        width: "100%",
                                        height: 'auto',
                                        backgroundColor: "var(--gray-5)",
                                    }}
                                />
                            </Inset>
                        </Card>
                    </Box>

                    {/* Details Section */}
                    <Box>
                        <Flex direction="column" gap="4">
                            {/* Badges */}
                            <Flex gap="2" align="center">
                                <Badge color="green" size="2" style={{ textTransform: 'capitalize' }}>
                                    {achievement.category}
                                </Badge>
                                <Badge color="blue" size="2" variant="soft" style={{ textTransform: 'capitalize' }}>
                                    {achievement.level}
                                </Badge>
                                {achievement.status && (
                                    <Badge color="amber" size="2">Verified</Badge>
                                )}
                            </Flex>

                            {/* Title */}
                            <Heading as="h1" size="7" weight="bold">
                                {achievement.title}
                            </Heading>

                            {/* Issuer */}
                            <Box>
                                <Text size="2" weight="medium" color="gray">
                                    Issued by
                                </Text>
                                <Text size="4" weight="bold" color="blue">
                                    {achievement.issuer}
                                </Text>
                            </Box>

                            {/* Description */}
                            <Box>
                                <Text size="2" weight="medium" color="gray">
                                    Description
                                </Text>
                                <Text size="3" style={{ lineHeight: '1.6' }}>
                                    {achievement.description}
                                </Text>
                            </Box>

                            <Separator size="4" />

                            {/* Metadata */}
                            <Grid columns="2" gap="4">
                                <Box>
                                    <Flex gap="2" align="center" mb="1">
                                        <CalendarIcon width="16" height="16" />
                                        <Text size="2" weight="medium">Issue Date</Text>
                                    </Flex>
                                    <Text size="3">
                                        {formatDate(achievement.issueDate)}
                                    </Text>
                                </Box>

                                <Box>
                                    <Flex gap="2" align="center" mb="1">
                                        <ClockIcon width="16" height="16" />
                                        <Text size="2" weight="medium">Reference</Text>
                                    </Flex>
                                    <Text size="3">
                                        {achievement.label}
                                    </Text>
                                </Box>
                            </Grid>

                            {/* Tags */}
                            <Box>
                                <Text size="2" weight="medium" color="gray" mb="2">
                                    Tags & Skills
                                </Text>
                                <Flex gap="2" wrap="wrap">
                                    {achievement.tags.map((tag, index) => (
                                        <Badge key={index} size="2" variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </Grid>
            </Card>
        </Box>
    );
}