"use client";

import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  Badge,
  Blockquote,
} from "@radix-ui/themes";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuBadgeCheck } from "react-icons/lu";

import type { WordItem } from "@/lib/words";

interface ProfileBlockProps {
  words: WordItem[];
}

export default function ProfileBlock({ words }: ProfileBlockProps) {
  return (
    <>
      <Grid
        columns={{
          initial: "1", // mobile: 1 kolom
          sm: "1", // tablet kecil: tetap 1
          md: "1", // mulai tablet besar: 2 kolom (teks + kanan)
          lg: "1",
          xl: "2",
        }}
        gap="4"
        width="100%"
        align="stretch"
        mb="var(--space-4)"
      >
        {/* Item 1 - Text Besar */}
        <Box
          flexGrow={{ initial: "1", xs: "1", sm: "1", md: "3" }}
          p={{ initial: "5", md: "6" }}
          style={{
            backgroundColor: "var(--gray-6)",
            border: "1px solid var(--gray-6)",
            borderRadius: "var(--radius-4)",
            // padding: "var(--space-6)",
          }}
        >
          <Heading size="7" style={{ color: "var(--accent-12)" }}>
            Hi&#44; I&#39;am{" "}
            <Text
              as="span"
              style={{ color: "var(--accent-12)", display: "inline-block" }}
            >
              <motion.span
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
                style={{ display: "inline-block", transformOrigin: "70% 70%" }}
              >
                👋
              </motion.span>
            </Text>
          </Heading>
          <Heading size="8" mb="3" style={{ color: "var(--accent-12)" }}>
            Andrianto
          </Heading>
          <Flex
            gap={{ initial: "2", md: "4" }}
            direction={{ initial: "column", md: "row" }}
            wrap="wrap"
            mb="4"
          >
            <Badge
              size="3"
              variant="soft"
              style={{
                width: "fit-content",
                paddingInline: "10px",
                whiteSpace: "nowrap",
              }}
            >
              &#9702; Based in Surabaya, Indonesia 🇮🇩
            </Badge>
            <Badge
              size="3"
              variant="soft"
              style={{
                width: "fit-content",
                paddingInline: "10px",
                whiteSpace: "nowrap",
              }}
            >
              &#9702; Onsite
            </Badge>
          </Flex>
          <Flex>
            <Box
              style={{
                // maxWidth: "720px",
                textAlign: "justify",
                marginTop: "20px",
              }}
            >
              <Text
                size="2"
                style={{
                  color: "var(--gray-12)",
                  lineHeight: "1.8",
                  display: "block",
                }}
              >
                I am a <strong>Full-Stack Web Developer</strong> with a strong
                foundation in Informatics Engineering and a passion for creating
                impactful digital solutions.
              </Text>

              <Text
                size="2"
                style={{
                  color: "var(--gray-12)",
                  lineHeight: "1.8",
                  marginTop: "14px",
                  display: "block",
                }}
              >
                I specialize in{" "}
                <strong>Laravel, React.js, Express.js, and Next.js</strong> —
                building applications that balance efficient back-end logic with
                clean and engaging front-end design.
              </Text>

              <Text
                size="2"
                style={{
                  color: "var(--gray-12)",
                  lineHeight: "1.8",
                  marginTop: "14px",
                  display: "block",
                }}
              >
                My focus is on <strong>scalability, performance,</strong> and
                <strong> user experience,</strong> ensuring every project
                delivers real value for both users and businesses.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Grid
          display="grid"
          columns={{ initial: "1", xs: "2", sm: "2" }}
          gap="4"
        >
          {/* Item 2 - Text Kecil */}
          <Box
            flexGrow={{ initial: "1", xs: "1", sm: "1", md: "1" }}
            style={{
              // backgroundColor: "var(--blue-1)",
              border: "1px solid var(--blue-6)",
              borderRadius: "var(--radius-4)",
              padding: "var(--space-5)",
              perspective: 1000,
            }}
          >
            <motion.div
              whileHover={{
                rotateX: 8,
                rotateY: -8,
                scale: 1.03,
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.25), 0 0 30px rgba(0, 150, 255, 0.3)",
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              style={{
                // backgroundColor: "var(--blue-1)",
                backgroundColor: "transparent",
                // border: "1px solid var(--blue-6)",
                // borderRadius: "var(--radius-4)",
                // padding: "var(--space-5)",
                transformStyle: "preserve-3d", // penting untuk efek 3D yang utuh
              }}
            >
              <Flex direction="column" gap="4">
                <Badge
                  style={{
                    width: "fit-content",
                    paddingInline: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <LuBadgeCheck />
                  <Text size="2">Words</Text>
                </Badge>
                {words?.map((i) => (
                  <Box key={i.id}>
                    <Blockquote size="2">
                      &#34;In which situations do they work best, when do they
                      fail us, and how can we determine whether we need them or
                      should steer clear?&#34;
                    </Blockquote>
                  </Box>
                ))}

                {/* <Box>
                  <Blockquote size="2">
                    &#34;When does something become our greatest ally, when does
                    it let us down, and how can we know whether to embrace it or
                    let it go?&#34;
                  </Blockquote>
                </Box>
                <Box>
                  <Blockquote size="2">
                    &#34;I can debug thousands of errors, but I can’t debug this
                    feeling for you 😅💻❤️.&#34;
                  </Blockquote>
                </Box>
                <Box>
                  <Blockquote size="2">
                    &#34;What is the true cost of convenience, when is it a
                    worthy trade-off, and how do we assess its value in the
                    grand scheme?&#34;
                  </Blockquote>
                </Box> */}
              </Flex>
            </motion.div>
          </Box>

          {/* Item 3 - Gambar Asli */}
          <Box
            flexGrow={{ initial: "1", xs: "1", sm: "1", md: "1" }}
            minHeight={{
              initial: "200px",
              xs: "180px",
              sm: "150px",
              md: "120px",
            }}
            style={{
              borderRadius: "var(--radius-4)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/profile/01.png"
              alt="Profile"
              width={400}
              height={200}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                display: "block",
                maxHeight: "400px", // default

                // responsive control pakai media query inline
                // "@media (min-width: 768px)": {
                //   maxHeight: "180px",
                // },
                // "@media (min-width: 1024px)": {
                //   maxHeight: "160px",
                // },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
