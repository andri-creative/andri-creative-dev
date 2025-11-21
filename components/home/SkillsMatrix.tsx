'use client'

import { Box, Card, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { motion } from "framer-motion";
import { useThemeMode } from "@/components/ThemeProvider";
import { useEffect, useRef, useState } from "react";
import type { SkillItem } from "@/lib/skills";
import { FaCode } from "react-icons/fa6";

export default function SkillsMatrix({ skills }: { skills: SkillItem[] }) {
  const { accentColor } = useThemeMode();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const duplicatedSkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [skills]);

  const animationDistance = containerWidth > 0 ? -containerWidth : -1000;

  return (
    <Card mb="var(--space-4)" style={{
      // padding: "var(--space-6)",
      backgroundColor: "var(--gray-1)",
      border: "1px solid var(--gray-6)",
      overflow: "hidden",
      position: "relative"

    }}>
      <Box p={{ initial: "2", md: "6" }}>
        <Box mb="5">
          <Heading
            size="8"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'  // ~8px
            }}
          >
            <FaCode style={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
            <Text style={{ margin: 0 }}>Skills</Text>
          </Heading>
          <Text size="3" color="gray">
            My professional skills.
          </Text>
        </Box>

        <Box
          ref={containerRef}
          style={{
            position: "relative",
            height: 120,
            width: "100%",
            overflow: "hidden",

          }}
        >
          <motion.div
            style={{
              display: "flex",
              gap: "2rem",
              position: "absolute",
              left: 0,
              top: 0,
              alignItems: "center",
              marginTop: '2rem'
            }}
            animate={{ x: [0, animationDistance] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedSkills.map((i, idx) => (
              <Box
                key={`${i.id}-${idx}`}
                position="relative"
                pb={{ initial: "2", sm: "3", md: "4" }}
                width={{ initial: "50px", sm: "60px", md: "80px" }}
                height={{ initial: "50px", sm: "60px", md: "80px" }}
              >
                {/* Glow Circle - Warp dengan Box yang sama ukuran */}
                <Box
                  position="absolute"
                  bottom='2'
                  left='2'
                  width={{ initial: "50px", sm: "60px", md: "80px" }}
                  height={{ initial: "50px", sm: "60px", md: "80px" }}
                  // width="80px" 
                  // height="80px"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: `var(--${accentColor}-9)`,
                    filter: "blur(10px)",
                    zIndex: -1,
                  }}
                />

                {/* Icon Container - Juga ambil 100% dari parent */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Box width={{ initial: "50px", sm: "60px", md: "80px" }}
                    height={{ initial: "50px", sm: "60px", md: "80px" }} style={{
                      backgroundColor: "rgba(255,255,255,0.4)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.25)",
                    }}>

                    <Image
                      src={i.icon}
                      alt={i.id + "-icon"}
                      width={40}
                      height={40}
                      style={{
                        width: "60%",
                        height: "60%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </motion.div>
              </Box>
            ))}
          </motion.div>
        </Box>
      </Box>
    </Card>
  );
}