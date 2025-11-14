"use client";
import { StarIcon } from "@radix-ui/react-icons";
import {
  Box,
  IconButton,
  Flex,
  Text,
  AlertDialog,
} from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { AnimationItem } from "lottie-web";

import sad from "@/public/emoticons/1.json";
import confused from "@/public/emoticons/2.json";
import neutral from "@/public/emoticons/3.json";
import happy from "@/public/emoticons/4.json";
import love from "@/public/emoticons/5.json";
// import starIcon from "@/public/emoticons/Star.json";

interface Emotion {
  icon: string;
  label: string;
  animation: object | AnimationItem;
}

export default function Stars() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const emoticons = [
    { icon: "😢", label: "Very Bad", animation: sad },
    { icon: "😕", label: "Bad", animation: confused },
    { icon: "😐", label: "Neutral", animation: neutral },
    { icon: "😊", label: "Good", animation: happy },
    { icon: "😍", label: "Very Good", animation: love },
  ];

  // Cek ukuran layar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setOpen(false); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleRatingSelect = (value: number, emotion: Emotion) => {
    setRating(value);
    setHover(0);
    setSelectedEmotion(emotion);

    // Tutup drawer dulu, baru buka alert
    setOpen(false);

    // Tunggu animasi drawer selesai, baru buka alert
    setTimeout(() => {
      setShowAlert(true);
    }, 300); // Sesuaikan dengan durasi animasi drawer
  };

  return (
    <Box>
      {/* Tombol Bintang */}
      <IconButton
        radius="full"
        variant="soft"
        size="4"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
          backgroundColor: "var(--accent-9)",
          color: "white",
        }}
      >
        <StarIcon width="24" height="24" />
      </IconButton>

      {/* Drawer Rating */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "black",
                zIndex: 99,
              }}
              onClick={() => setOpen(false)}
            />

            {/* Panel Drawer dari bawah */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "var(--color-panel)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                padding: isMobile ? "20px" : "32px",
                zIndex: 100,
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <Flex direction="column" justify="center" align="center" gap="4">
                <Text
                  size={isMobile ? "5" : "7"}
                  weight="bold"
                  align="center"
                  style={{ marginBottom: "8px" }}
                >
                  Give Your Rating
                </Text>
                <Text
                  size={isMobile ? "2" : "3"}
                  align="center"
                  color="gray"
                  style={{ marginBottom: "24px" }}
                >
                  Choose an emoji that reflects your experience
                </Text>

                {/* Daftar Emotikon - SEJAJAR TIDAK TURUN */}
                <Flex
                  justify="center"
                  align="center"
                  gap={isMobile ? "3" : "5"}
                  style={{
                    width: "100%",
                    maxWidth: isMobile ? "100%" : "600px",
                  }}
                >
                  {emoticons.map((item, index) => {
                    const value = index + 1;
                    const isSelected = value <= (hover || rating);

                    return (
                      <Flex
                        key={index}
                        direction="column"
                        align="center"
                        gap="2"
                        style={{
                          flex: "1",
                          minWidth: isMobile ? "60px" : "80px",
                          maxWidth: isMobile ? "80px" : "100px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRatingSelect(value, item)}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                      >
                        {/* Emoji Button - SEJAJAR */}
                        <Box
                          style={{
                            width: isMobile ? "50px" : "60px",
                            height: isMobile ? "50px" : "60px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isSelected
                              ? "var(--accent-9)"
                              : "var(--gray-3)",
                            border: `2px solid ${isSelected ? "var(--accent-9)" : "var(--gray-6)"
                              }`,
                            transition: "all 0.2s ease",
                            transform: isSelected ? "scale(1.15)" : "scale(1)",
                            fontSize: isMobile ? "1.8rem" : "2rem",
                          }}
                        >
                          {item.icon}
                        </Box>

                        {/* Label */}
                        <Text
                          size={isMobile ? "1" : "2"}
                          weight={isSelected ? "bold" : "medium"}
                          color={isSelected ? "violet" : "gray"}
                          align="center"
                          style={{
                            lineHeight: "1.2",
                            height: isMobile ? "32px" : "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.label}
                        </Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Alert Dialog dengan Animasi Lottie */}
      <AlertDialog.Root open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialog.Content
          size="2"
          maxWidth="350px"
          style={{
            textAlign: "center",
            padding: "24px",
            backgroundColor: "transparent",
            // backgroundColor: "var(--color-panel)",
            border: "none",
            boxShadow: "none",
          }}
        >
          <AlertDialog.Title style={{ display: "none" }}>
            Rating Feedback
          </AlertDialog.Title>

          <Flex direction="column" align="center" gap="4">
            {/* Animasi Lottie */}
            {selectedEmotion && (
              <Box style={{ width: 120, height: 120 }}>
                <Lottie
                  animationData={selectedEmotion.animation}
                  loop={true}
                  autoplay={true}
                />
              </Box>
            )}

            <Text size="4" weight="bold">
              Thank You!
            </Text>

            <Text size="2" color="gray" align="center">
              Thank you for your{" "}
              <Text weight="bold" color="violet">
                {selectedEmotion?.label.toLowerCase()}
              </Text>{" "}
              rating!
            </Text>

            {/* <Text size="1" color="gray">
              This dialog will close automatically in 3 seconds...
            </Text> */}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
}
