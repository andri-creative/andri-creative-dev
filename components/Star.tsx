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
import { startTransition } from "react";

import sad from "@/public/emoticons/1.json";
import confused from "@/public/emoticons/2.json";
import neutral from "@/public/emoticons/3.json";
import happy from "@/public/emoticons/4.json";
import love from "@/public/emoticons/5.json";
import { useRatingForm } from '@/app/hooks/useRatingForm'
import { ratingService } from '@/app/services/ratingService'

interface Emotion {
  icon: string;
  label: string;
  animation: object | AnimationItem;
}
import { RatingStats } from "@/lib/getDashboard";

interface StarsProps {
  refreshRating: (newRating?: number) => void;
  updateRatingStats?: (newStats: RatingStats) => void;
}

export default function Stars({ refreshRating }: StarsProps) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
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

  // Gunakan TanStack Form
  const { form, isSubmitting } = useRatingForm({
    onSubmit: async (values) => {
      // ⭐ TAMBAHKAN RETURN
      return await ratingService.submitRating(values.rating);
    },
  })

  const ratingValue = form.state.values.rating;

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

  const handleRatingSelect = async (value: number, emotion: Emotion) => {
    setSelectedEmotion(emotion);
    form.setFieldValue('rating', value);

    console.log("🎯 Emoticon yang dipilih:", emotion.label);
    console.log("⭐ Rating value:", value);

    try {
      // 1. OPTIMISTIC UPDATE DULU
      if (typeof refreshRating === 'function') {
        refreshRating(value);
      }

      // 2. SUBMIT DAN DAPATKAN RESPONSE
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await form.handleSubmit() as any;
      console.log("✅ Rating submitted with response:", result);

      // 3. GUNAKAN STATS DARI RESPONSE BACKEND (REAL-TIME!)
      if (result?.stats) {
        console.log("🎉 Using real-time stats from backend:", result.stats);
        // Data real dari backend sudah ada di sini!
      }

      setOpen(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 300);
    } catch (error) {
      console.error("❌ Failed to submit rating:", error);
      setOpen(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 300);
    }
  };

  function resetUI() {
    form.reset();
    setHover(0);
    setSelectedEmotion(null);
  }

  useEffect(() => {
    if (open) {
      startTransition(resetUI);
    }
  }, [open]);


  return (
    <Box>
      {/* Tombol Bintang */}
      <IconButton
        radius="full"
        variant="soft"
        size="4"
        onClick={() => setOpen(true)}
        disabled={isSubmitting}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
          backgroundColor: "var(--accent-9)",
          color: "white",
          opacity: isSubmitting ? 0.6 : 1,
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
              onClick={() => !isSubmitting && setOpen(false)}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                <Flex direction="column" justify="center" align="center" gap="4">
                  <Text
                    size={isMobile ? "5" : "7"}
                    weight="bold"
                    align="center"
                    style={{ marginBottom: "8px" }}
                  >
                    {"Give Your Rating"}
                  </Text>
                  <Text
                    size={isMobile ? "2" : "3"}
                    align="center"
                    color="gray"
                    style={{ marginBottom: "24px" }}
                  >
                    {isSubmitting ? "Please wait..." : "Choose an emoji that reflects your experience"}
                  </Text>

                  {/* Field rating (hidden) */}
                  <form.Field name="rating">
                    {(field) => (
                      <input
                        type="hidden"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                    )}
                  </form.Field>

                  {/* Daftar Emotikon */}
                  <Flex
                    justify="center"
                    align="center"
                    gap={isMobile ? "3" : "5"}
                    style={{
                      width: "100%",
                      maxWidth: isMobile ? "100%" : "600px",
                      opacity: isSubmitting ? 0.6 : 1,
                      pointerEvents: isSubmitting ? "none" : "auto",
                    }}
                  >
                    {emoticons.map((item, index) => {
                      const value = index + 1;
                      const isSelected = value <= (hover || ratingValue);

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
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                          }}
                          onClick={() => !isSubmitting && handleRatingSelect(value, item)}
                          onMouseEnter={() => !isSubmitting && setHover(value)}
                          onMouseLeave={() => !isSubmitting && setHover(0)}
                        >
                          {/* Emoji Button */}
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
              </form>
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

            <AlertDialog.Description>
              Thank you for your rating!
            </AlertDialog.Description>

            <Text size="2" color="gray" align="center">
              Thank you for your{" "}
              <Text weight="bold" color="violet">
                {selectedEmotion?.label.toLowerCase()}
              </Text>{" "}
              rating!
            </Text>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
}