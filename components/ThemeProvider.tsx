"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  startTransition,
} from "react";
import { Theme } from "@radix-ui/themes";
import { injectRadixColors } from "@/lib/radixColors";

type AccentColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

type GrayColor = "gray" | "mauve" | "slate" | "sage" | "olive" | "sand";

interface ThemeContextValue {
  mode: "light" | "dark";
  accentColor: string;
  grayColor: string;
  toggleMode: () => void;
  setAccentColor: React.Dispatch<React.SetStateAction<AccentColor>>;
  setGrayColor: React.Dispatch<React.SetStateAction<GrayColor>>;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  accentColor: "blue",
  grayColor: "mauve",
  toggleMode: () => {},
  setAccentColor: () => {},
  setGrayColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [accentColor, setAccentColor] = useState<AccentColor>("blue");
  const [grayColor, setGrayColor] = useState<GrayColor>("mauve");

  // 🔹 Inject Radix Colors
  useEffect(() => {
    injectRadixColors();
  }, []);

  // 🔹 Load preferensi awal
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    const savedAccent = localStorage.getItem("accentColor") as AccentColor;
    const savedGray = localStorage.getItem("grayColor") as GrayColor;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    startTransition(() => {
      if (savedMode === "dark" || (!savedMode && systemDark)) setMode("dark");
      if (savedAccent) setAccentColor(savedAccent);
      if (savedGray) setGrayColor(savedGray);
    });
  }, []);

  // 🔹 Simpan preferensi
  useEffect(() => {
    localStorage.setItem("theme", mode);
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("grayColor", grayColor);
  }, [mode, accentColor, grayColor]);

  // 🔹 Ubah background halaman sesuai accentColor & mode
  useEffect(() => {
    document.body.style.transition = "background-color 0.3s ease";

    const bgColor =
      mode === "dark"
        ? `var(--${accentColor}-12)` // warna gelap dari accent
        : `var(--${accentColor}-2)`; // warna terang dari accent

    // Terapkan warna background ke body
    document.body.style.backgroundColor = bgColor;

    // Opsional: ubah warna teks biar kontras
    document.body.style.color = mode === "dark" ? "white" : "black";
  }, [mode, accentColor]);

  // 🔹 Provider Radix Theme
  return (
    <ThemeContext.Provider
      value={{
        mode,
        accentColor,
        grayColor,
        toggleMode: () => setMode((m) => (m === "light" ? "dark" : "light")),
        setAccentColor,
        setGrayColor,
      }}
    >
      <Theme
        appearance={mode}
        accentColor={accentColor}
        grayColor={grayColor}
        radius="large"
        scaling="100%"
        hasBackground={true}
        panelBackground="solid"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
