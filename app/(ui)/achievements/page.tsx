'use client'

import { Box, Card, Grid, Heading, Text, Inset, Flex, Badge, Button } from "@radix-ui/themes";
import Image from "next/image";
import { GiAchievement } from "react-icons/gi";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";
import { useThemeMode } from "@/components/ThemeProvider";
import { useAppContext } from "@/app/contexts/AppContext";
import { TbPinned } from 'react-icons/tb'
import { useMemo } from "react";

export default function AchievementsPage() {
    const { accentColor } = useThemeMode();
    const { achievements, achievementsPagination, achievementsLoading } = useAppContext();
    const router = useRouter();
    console.log('achievementsLoading:', achievementsLoading);

    const sortedAchievements = useMemo(() => {
        if (!Array.isArray(achievements)) return []
        return [...achievements].sort((a, b) => {
            if (a.pinned !== b.pinned) {
                return Number(b.pinned) - Number(a.pinned)
            }

            const dateA = new Date(a.issueDate.split(',')[0])
            const dateB = new Date(b.issueDate.split(',')[0])

            return dateB.getTime() - dateA.getTime()
        })
    }, [achievements])

    console.log('ii', sortedAchievements)
    const handleViewDetails = (id: string) => {
        router.push(`/achievements/${id.toString()}`);
    };

    const handlePageChange = (page: number) => {
        console.log(page);
    };

    const generatePageNumbers = () => {
        const { currentPage, totalPages } = achievementsPagination;
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            if (startPage > 1) pages.push(1);
            if (startPage > 2) pages.push('...');

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) pages.push('...');
            if (endPage < totalPages) pages.push(totalPages);
        }

        return pages;
    };

    // Jika totalPages = 1, tetap tampilkan pagination untuk testing
    const shouldShowPagination = achievementsPagination.totalPages >= 1;

    return (
        <Box>
            <Card mb="var(--space-4)" style={{
                // padding: "var(--space-6)",
                backgroundColor: "var(--gray-1)",
                border: "1px solid var(--gray-6)",
                overflow: "hidden",
                position: "relative"

            }}>
                <Box p={{ initial: 'var(--space-1)', sm: 'var(--space-3)', md: 'var(--space-6)' }}>
                    <Box mb="5">
                        <Heading
                            size="8"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'  // ~8px
                            }}
                        >
                            <GiAchievement style={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
                            <Text style={{ margin: 0 }}>Achievements</Text>
                        </Heading>
                        <Text size="3" color="gray">
                            A curated collection of certificates and badges I&#39;ve earned throughout my professional and academic journey.
                        </Text>
                    </Box>

                    <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="var(--space-4)">
                        {sortedAchievements.map((i) => (
                            <Box maxWidth="440px" key={i.id}>
                                <Card size="2" style={{
                                    position: "relative"
                                }}>
                                    <Inset clip="padding-box" side="top" pb="current">
                                        <Image
                                            src={i.src}
                                            alt={i.id + ' certificate' + i.title}
                                            width={400}
                                            height={240}
                                            style={{
                                                display: "block",
                                                objectFit: "contain",
                                                width: "100%",
                                                height: 'auto',
                                                backgroundColor: "var(--gray-5)",
                                            }}
                                        />
                                    </Inset>
                                    {i.pinned === true && (
                                        <Box position="absolute" top='2' right='3' style={{
                                            backgroundColor: `var(--${accentColor}-4)`,
                                            padding: "6px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            cursor: "pointer",
                                        }}>
                                            <TbPinned size={16} color={`var(--${accentColor}-9)`} />
                                        </Box>
                                    )}
                                    <Flex direction="column" gap="2" mt="2">
                                        {/* Badge Status */}
                                        <Flex gap="2" align="center">
                                            <Badge color="green" size="1" variant="soft">
                                                {i.category}
                                            </Badge>
                                            {i.status && (
                                                <Badge color="blue" size="1">Verified</Badge>
                                            )}
                                        </Flex>

                                        {/* Title */}
                                        <Heading as="h3" size="4" weight="bold" style={{
                                            lineHeight: '1.3',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {i.title.length > 60 ? i.title.substring(0, 60) + '...' : i.title}
                                        </Heading>

                                        {/* Issuer */}
                                        <Text as="p" size="2" weight="medium" color="blue">
                                            {i.issuer}
                                        </Text>

                                        {/* Informasi singkat */}
                                        <Flex gap="3">
                                            <Text size="1" color="gray">
                                                📅 {
                                                    (() => {
                                                        const issueDate = i.issueDate; // contoh: "2025-11-4,5"

                                                        if (issueDate.includes(',')) {
                                                            const [first, second] = issueDate.split(',');
                                                            const [year, month] = first.split('-'); // ambil tahun dan bulan

                                                            // tanggal awal dan akhir dalam format lengkap
                                                            const start = new Date(`${year}-${month}-${first.split('-')[2]}`);
                                                            const end = new Date(`${year}-${month}-${second}`);

                                                            const sameMonth = start.getMonth() === end.getMonth();
                                                            const sameYear = start.getFullYear() === end.getFullYear();

                                                            const startDay = start.getDate();
                                                            const endDay = end.getDate();

                                                            const monthName = start.toLocaleString('id-ID', { month: 'short' });
                                                            const yearName = start.getFullYear();

                                                            if (sameMonth && sameYear) {
                                                                return `${startDay},${endDay} ${monthName} ${yearName}`;
                                                            } else {
                                                                const endFormatted = end.toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                });
                                                                return `${startDay} ${monthName} ${yearName}–${endFormatted}`;
                                                            }
                                                        } else {
                                                            return new Date(issueDate).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            });
                                                        }
                                                    })()
                                                }

                                            </Text>
                                            <Text size="1" color="gray">
                                                ⭐ {i.level}
                                            </Text>
                                        </Flex>

                                        {/* Tags */}
                                        <Flex gap="1" wrap="wrap">
                                            {i.tags.slice(0, 2).map((tag, index) => (
                                                <Badge key={index} size="1" variant="outline" color="gray">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </Flex>

                                        {/* Detail Button */}
                                        <Flex justify="end" mt="2">
                                            <Button size="2" variant="soft" onClick={() => handleViewDetails(i.id)}>
                                                View Details
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Box>
                        ))}
                    </Grid>
                    {
                        shouldShowPagination && (
                            <Flex justify="center" align="center" gap="3" mt="6">
                                <Text size="2" color="gray" mr="2">
                                    Page {achievementsPagination.currentPage} of {achievementsPagination.totalPages}
                                </Text>

                                {/* First Page */}
                                <Button
                                    variant="soft"
                                    size="2"
                                    disabled={achievementsPagination.currentPage === 1}
                                    onClick={() => handlePageChange(1)}
                                >
                                    <DoubleArrowLeftIcon width="14" height="14" />
                                </Button>

                                {/* Previous Page */}
                                <Button
                                    variant="soft"
                                    size="2"
                                    disabled={achievementsPagination.currentPage === 1}
                                    onClick={() => handlePageChange(achievementsPagination.currentPage - 1)}
                                >
                                    <ChevronLeftIcon width="14" height="14" />
                                </Button>

                                {/* Page Numbers */}
                                <Flex gap="1">
                                    {generatePageNumbers().map((page, index) => (
                                        page === '...' ? (
                                            <Text key={`ellipsis-${index}`} size="2" color="gray" style={{ padding: '0 8px' }}>
                                                ...
                                            </Text>
                                        ) : (
                                            <Button
                                                key={page}
                                                variant={achievementsPagination.currentPage === page ? "solid" : "soft"}
                                                size="2"
                                                onClick={() => handlePageChange(page as number)}
                                            >
                                                {page}
                                            </Button>
                                        )
                                    ))}
                                </Flex>

                                {/* Next Page */}
                                <Button
                                    variant="soft"
                                    size="2"
                                    disabled={achievementsPagination.currentPage === achievementsPagination.totalPages}
                                    onClick={() => handlePageChange(achievementsPagination.currentPage + 1)}
                                >
                                    <ChevronRightIcon width="14" height="14" />
                                </Button>

                                {/* Last Page */}
                                <Button
                                    variant="soft"
                                    size="2"
                                    disabled={achievementsPagination.currentPage === achievementsPagination.totalPages}
                                    onClick={() => handlePageChange(achievementsPagination.totalPages)}
                                >
                                    <DoubleArrowRightIcon width="14" height="14" />
                                </Button>
                            </Flex>
                        )
                    }
                </Box>
            </Card >
        </Box >
    );
}