
import {
    Box,
    Card,
    Grid,
    Heading,
    Text,
} from "@radix-ui/themes";
import { ImCodepen } from "react-icons/im";
import Project from "./FeaturedSections/project";
import AboutMe from "./FeaturedSections/aboutme";
import Skills from "./FeaturedSections/skills";
import Achievements from "./FeaturedSections/achievements";
import Chat from "./FeaturedSections/chat"
import Services from "./FeaturedSections/services";

import { getAllDashboard } from "@/lib/gelAllDashboard";

export default async function FeaturedSections() {

    const data = await getAllDashboard();

    const dataAchievements = data?.dashboard?.achievements?.achievement || [];
    const dataProject = data?.dashboard?.project?.projects || [];
    const dataMyAlbum = data?.dashboard?.myAlbum || []

    return (
        <Card mb="var(--space-4)">
            <Box p={{ initial: "2", md: "6" }}>
                {/* Haeding */}
                <Box mb="5">
                    <Heading
                        size="8"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <ImCodepen
                            style={{ fontSize: "inherit", verticalAlign: "middle" }}
                        />
                        <Text style={{ margin: 0 }}>Featured Sections</Text>
                    </Heading>
                    <Text size="3" color="gray">
                        Explore everything I`ve crafted, contributed, and accomplished.
                    </Text>
                </Box>
                {/* Concatenate 1*/}
                <Grid
                    style={{ marginBottom: "1rem" }}
                    columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                    gap="4"
                >
                    <Card>
                        <Box p={{ initial: "0", md: "4" }}>
                            {/* Project */}
                            <Project project={dataProject} />
                        </Box>
                    </Card>
                    <Box>
                        <Grid
                            columns={{ initial: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
                            gap="4"
                        >
                            <AboutMe myAlbum={dataMyAlbum} />
                            <Skills />

                        </Grid>
                    </Box>
                </Grid>
                {/* Concatenate 2*/}
                <Grid
                    style={{ marginBottom: "1rem" }}
                    columns={{ initial: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                    gap="4"
                >
                    <Box>
                        <Grid
                            columns={{ initial: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
                            gap="4"
                        >
                            <Achievements achievement={dataAchievements} />
                            <Chat />
                        </Grid>
                    </Box>

                    <Card>
                        <Services />
                    </Card>
                </Grid>
            </Box>
        </Card>
    );
}
