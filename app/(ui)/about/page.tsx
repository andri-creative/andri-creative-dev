'use client'

import { useThemeMode } from "@/components/ThemeProvider";
import { Box, Card, Grid, Heading, Text, Flex, Strong, Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { PiGraduationCap } from "react-icons/pi";
import { IoBriefcaseOutline } from "react-icons/io5";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const experienceData = [
    {
        id: 1,
        company: "PT Flashcom Indonesia",
        position: "Full Stack Developer - Laundry Post",
        location: "Rungkut, Surabaya",
        period: "Feb 2024 - Apr 2024",
        duration: "3 bulan",
        employmentType: "Full-time",
        workModel: "Hybrid",
        logo: "/logo/flashcom.png",
        fallback: "FC",
        responsibilities: [
            "Mengembangkan aplikasi laundry full-stack menggunakan Laravel",
            "Membangun RESTful API dengan Laravel",
            "Mengembangkan frontend responsive menggunakan Bootstrap",
            "Mengimplementasikan fitur interaktif dengan jQuery"
        ],
        achievements: [
            "Menyelesaikan project 2 minggu lebih cepat dari deadline",
            "Meningkatkan performa aplikasi hingga 40%",
            "Mendapat feedback positif dari client"
        ],
        technologies: ["Laravel", "MySQL", "Bootstrap", "jQuery", "PHP"]
    },
    {
        id: 2,
        company: "SMPN 1 Sedati",
        position: "Full Stack Developer - Perpustakaan Digital",
        location: "Sedati, Sidoarjo",
        period: "Jul 2024 - Des 2024",
        duration: "6 bulan",
        employmentType: "Project-based",
        workModel: "Hybrid / Remote",
        logo: "/logo/smpn-1-sedati.png",
        fallback: "PD",
        responsibilities: [
            "Mendesain dan mengimplementasikan aplikasi Perpustakaan Digital berbasis web menggunakan Next.js",
            "Membangun API dan layer data dengan PostgreSQL (Prisma sebagai ORM)",
            "Menambahkan fitur pemindaian QR code untuk peminjaman dan pengembalian buku",
            "Membuat UI responsif dan aksesibel menggunakan Tailwind CSS",
            "Mengimplementasikan autentikasi dan otorisasi pengguna (NextAuth / JWT)",
            "Mengoptimalkan performa, caching, dan SEO untuk daftar katalog buku"
        ],
        achievements: [
            "Meluncurkan MVP dengan fitur peminjaman lewat QR code dalam 6 minggu",
            "Meningkatkan kecepatan pemuatan halaman katalog hingga 55%",
            "Menurunkan jumlah error peminjaman manual sebesar 90% setelah integrasi QR"
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "Tailwind CSS",
            "NextAuth",
            "qrcode"
        ]
    }
];


export default function AboutPage() {
    const { accentColor } = useThemeMode();

    return (
        <Box>
            <Grid py={{ initial: '4', md: '4' }} px={{ initial: '0' }} columns={{ initial: "1", md: "2" }} gap='5'>
                <Card >
                    <Box py={{ initial: '2', md: '4' }} px={{ initial: '2', md: '4' }} >
                        <Heading size='7'>About Me</Heading>
                        <Text size='3' mb='7'>A brief introduction to who I am.</Text>
                        <Box style={{
                            borderBottom: `1px dashed  var(--${accentColor}-12)`,
                            marginTop: '2rem',
                            marginBottom: '1rem'
                        }} />
                        <Flex direction="column" gap="5" mb={{ initial: '5', md: '8' }}>
                            <Text as="p" size="2" style={{
                                lineHeight: '1.7',
                                textAlign: 'justify'
                            }}>
                                I am an experienced and passionate Full-Stack Developer with a strong foundation in
                                Informatics Engineering from University 17 August 1945 Surabaya. I specialize in
                                developing scalable, efficient, and user-centric digital solutions across platforms.
                            </Text>

                            <Text as="p" size="3" style={{
                                lineHeight: '1.7',
                                textAlign: 'justify'
                            }}>
                                On the frontend, I use <Strong>React.js</Strong>, <Strong>Next.js</Strong>, and <Strong>Tailwind CSS</Strong> to build responsive and
                                accessible interfaces. On the backend, I work with <Strong>Laravel</Strong>, <Strong>Express.js</Strong>, and <Strong>Golang</Strong>
                                to design and implement reliable services. I also integrate data visualization into
                                projects, ensuring clarity and usability.
                            </Text>

                            <Text as="p" size="3" style={{
                                lineHeight: '1.7',
                                textAlign: 'justify'
                            }}>
                                I thrive in collaborative environments, take pride in being detail-oriented and
                                adaptable, and am committed to continuous learning. My goal is to deliver
                                high-performance applications that create meaningful impact for users and businesses.
                            </Text>
                        </Flex>

                        <Flex direction="column">
                            <Text size='3'>Best regards,</Text>
                            <Text size='4' style={{
                                fontFamily: 'WhiteStar',
                                fontSize: '2rem',
                                color: `var(--${accentColor}-12)`
                            }}>Andri</Text>
                        </Flex>
                    </Box>
                </Card>
                <Card>
                    <Box py={{ initial: '2', md: '4' }} px={{ initial: '2', md: '4' }} >
                        <Box mb="5">
                            <Heading
                                size="8"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'  // ~8px
                                }}
                            >
                                <PiGraduationCap style={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
                                <Text style={{ margin: 0 }}>Education</Text>
                            </Heading>
                            <Text size="3" color="gray">
                                My educational journey.
                            </Text>
                        </Box>
                        <Flex direction="row" gap="4" align="start" style={{
                            // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                            // padding: '24px',
                            borderRadius: '12px',
                            // border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}>
                            <Box>
                                <Avatar
                                    size={{ initial: '6', md: '7' }}
                                    src="/logo/logo-untag.png"
                                    fallback="UT"
                                    style={{
                                        border: `0.1px solid var(--${accentColor}-12)`,
                                        padding: '4px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                                    }}
                                />
                            </Box>

                            <Box>
                                <Heading size="5" mb="2" style={{
                                    background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--gray-12) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}>
                                    Universitas 17 Agustus 1945 (Untag) Surabaya
                                </Heading>

                                <Text size="4" weight="bold" mb="1" style={{
                                    background: 'linear-gradient(135deg, var(--accent-10) 0%, var(--gray-10) 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}>
                                    Teknik Informatika
                                </Text>

                                {/* Informasi dalam Grid */}
                                <Flex direction="column" gap="1" mb="2">
                                    <Flex gap="2" align="center">
                                        <Box style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: 'var(--accent-9)'
                                        }} />
                                        <Text size="2" style={{
                                            background: 'linear-gradient(135deg, var(--accent-9) 0%, var(--gray-9) 90%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            color: 'transparent'
                                        }}>
                                            <Text weight="bold">Bachelor&#39;s degree</Text> • Informatics Engineering (S.Kom)
                                        </Text>
                                    </Flex>
                                    <Flex gap="2" align="center">
                                        <Box style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: '#3b82f6'
                                        }} />
                                        <Text size="2" style={{
                                            background: 'linear-gradient(135deg, var(--accent-8) 0%, var(--gray-8) 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            color: 'transparent'
                                        }}>
                                            <Text weight="medium">2021 - 2025</Text> • Surabaya, Indonesia
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                        <Box style={{
                            // background: 'white',
                            padding: '16px',
                            borderRadius: '8px',
                            borderLeft: `4px solid var(--${accentColor}-8)`,
                            borderTop: `1px solid var(--${accentColor}-5)`,
                            borderRight: `1px solid var(--${accentColor}-5)`,
                            borderBottom: `1px solid var(--${accentColor}-5)`,
                            marginTop: '12px',
                            marginBottom: '12px'
                        }}>
                            <Text size="2" weight="bold" mb="1">
                                📚 Judul Skripsi:
                            </Text>
                            <Text size="3" style={{ lineHeight: '1.5', marginLeft: '5px' }}>
                                &#34;Generating Synthetic B-Mode Fetal Ultrasound Images Using CycleGAN-Based Deep Learning&#34;
                            </Text>

                            <Box mt="2">
                                <Text size="2" weight="bold" mb="1">
                                    🔍 Deskripsi:
                                </Text>
                                <Text size="2" style={{ lineHeight: '1.4', marginLeft: '5px' }}>
                                    This study proposes a CycleGAN-based deep learning model with a histogram-guided discriminator (HisDis) to generate realistic synthetic B-mode fetal ultrasound images. This approach addresses medical data scarcity and preserves anatomical structures for AI diagnostic training.
                                </Text>
                            </Box>
                        </Box>

                        {/* Tech Stack */}
                        <Flex gap="2" mt="5" wrap="wrap">
                            {['Python', 'CycleGAN', 'HisDis', 'ResNet', 'TensorFlow', 'PatchGAN'].map((tech) => (
                                <Box
                                    key={tech}
                                    style={{
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        color: `var(--${accentColor}-9)`,
                                        padding: '4px 8px',
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        border: '1px solid rgba(102, 126, 234, 0.2)'
                                    }}
                                >
                                    {tech}
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <Card >
                <Box py={{ initial: '2', md: '4' }} px={{ initial: '0', md: '4' }}>
                    <Box mb="5" px={{ initial: '2', md: '0' }}>
                        <Heading
                            size="8"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <IoBriefcaseOutline style={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
                            <Text style={{ margin: 0 }}>Career</Text>
                        </Heading>
                        <Text size="3" color="gray">
                            My professional journey.
                        </Text>
                    </Box>
                    <Grid py={{ initial: '4', md: '4' }} px={{ initial: '1' }} columns={{ initial: "1", md: "2" }} gap='5'>
                        {experienceData.map((i) => (
                            <Card key={i.id}>
                                <Flex direction='row' gap='4' align="start" py={{ initial: '2', md: '3' }} style={{
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease-in-out',
                                    background: 'var(--color-panel)',
                                    marginBottom: '15px'
                                }}>
                                    <Box>
                                        <Avatar
                                            size={{ initial: '6', md: '7' }}
                                            src={i.logo}
                                            fallback="FC"
                                            style={{
                                                borderRadius: '8px',
                                                padding: '2px'
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Heading size={{ initial: '3', md: '4' }} style={{ margin: 0, marginBottom: '4px' }}>
                                            {i.position}
                                        </Heading>

                                        <Text size={{ initial: '2', md: '3' }} style={{ color: 'var(--gray-11)', marginBottom: '8px' }}>
                                            {i.company} • {i.location}
                                        </Text>

                                        <Flex gap={{ initial: '1', md: '4' }} align="center" mb="2" wrap="wrap">
                                            <Flex gap="2" align="center">
                                                <Box style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: 'var(--accent-9)'
                                                }} />
                                                <Text size="2" weight="medium">
                                                    {i.period}
                                                </Text>
                                            </Flex>

                                            <Flex gap="2" align="center">
                                                <Box style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: 'var(--green-9)'
                                                }} />
                                                <Text size="2">
                                                    {i.duration}
                                                </Text>
                                            </Flex>
                                        </Flex>

                                        <Flex gap="3" wrap="wrap">
                                            <Box style={{
                                                background: 'var(--accent-3)',
                                                color: 'var(--accent-11)',
                                                padding: '4px 8px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>
                                                {i.employmentType}
                                            </Box>
                                            <Box style={{
                                                background: 'var(--blue-3)',
                                                color: 'var(--blue-11)',
                                                padding: '4px 8px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>
                                                {i.workModel}
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>

                                <Box>
                                    <Accordion.Root type="single" collapsible>
                                        <Accordion.Item value="job-details">
                                            <Accordion.Trigger style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                textAlign: 'left',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                marginBottom: '15px'
                                            }}>
                                                <Flex justify="between" align="center">
                                                    <Text size="3">📋 Job Details & Achievements</Text>
                                                    <ChevronDownIcon />
                                                </Flex>
                                            </Accordion.Trigger>

                                            <Accordion.Content style={{
                                                padding: '16px',
                                                background: 'var(--gray-2)',
                                                border: '1px solid var(--gray-6)',
                                                borderTop: 'none',
                                                borderRadius: '0 0 8px 8px',
                                                marginTop: '4px'
                                            }}>
                                                <Flex direction="column" gap="3">
                                                    <Box>
                                                        <Text weight="bold" size="2" style={{ color: 'var(--accent-11)' }}>🎯 Responsibilities:</Text>
                                                        <Box style={{ paddingLeft: '20px', marginTop: '4px' }}>
                                                            {i.responsibilities.map((resp, i) => (
                                                                <Text key={i} as="div" size="2" style={{ marginBottom: '4px' }}>• {resp}</Text>
                                                            ))}
                                                            {/* <Text as="div" size="2" style={{ marginBottom: '4px' }}>• Membuat RESTful API dengan Node.js dan Express</Text>
                                                            <Text as="div" size="2" style={{ marginBottom: '4px' }}>• Membangun frontend responsive dengan React.js</Text>
                                                            <Text as="div" size="2">• Mengintegrasikan sistem payment gateway</Text> */}
                                                        </Box>
                                                    </Box>

                                                    <Box>
                                                        <Text weight="bold" size="2" style={{ color: 'var(--accent-11)' }}>🚀 Achievements:</Text>
                                                        <Box style={{ paddingLeft: '20px', marginTop: '4px' }}>
                                                            {i.achievements.map((ach, i) => (
                                                                <Text key={i} as="div" size="2" style={{ marginBottom: '4px' }}>• {ach}</Text>
                                                            ))}
                                                            {/* <Text as="div" size="2" style={{ marginBottom: '4px' }}>• Menyelesaikan project 2 minggu lebih cepat dari deadline</Text>
                                                            <Text as="div" size="2" style={{ marginBottom: '4px' }}>• Meningkatkan performa aplikasi hingga 40%</Text>
                                                            <Text as="div" size="2">• Mendapat feedback positif dari client</Text> */}
                                                        </Box>
                                                    </Box>

                                                    <Box>
                                                        <Text weight="bold" size="2" style={{ color: 'var(--accent-11)' }}>🛠️ Technologies:</Text>
                                                        <Flex gap="2" wrap="wrap" mt="2">
                                                            {i.technologies.map((tech) => (
                                                                <Box
                                                                    key={tech}
                                                                    style={{
                                                                        background: 'var(--accent-5)',
                                                                        color: 'var(--accent-11)',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '12px',
                                                                        fontSize: '11px',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    {tech}
                                                                </Box>
                                                            ))}
                                                            {/* {['React.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker'].map((tech) => (
                                                                <Box
                                                                    key={tech}
                                                                    style={{
                                                                        background: 'var(--accent-5)',
                                                                        color: 'var(--accent-11)',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '12px',
                                                                        fontSize: '11px',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    {tech}
                                                                </Box>
                                                            ))} */}
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    </Accordion.Root>
                                </Box>
                            </Card>
                        ))}
                    </Grid>
                </Box>
            </Card>
        </Box >
    );
}