import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Andri | Creative Developer",
  description:
    "Selamat datang di portfolio Andri. Seorang Web Developer kreatif dengan fokus pada teknologi modern, desain interaktif, dan pengalaman pengguna yang menarik.",
  keywords: [
    "Andri",
    "Portfolio Andri",
    "Web Developer",
    "Creative Developer",
    "Next.js",
    "Frontend Developer",
    "Fullstack Developer",
  ],
  authors: [{ name: "Andri" }],

  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/favicon/site.webmanifest",

  openGraph: {
    title: "Portfolio Andri | Creative Developer",
    description:
      "Eksplorasi karya, pengalaman, dan keahlian Andri dalam pengembangan web modern.",
    url: "https://www.andri.biz.id/",
    siteName: "Portfolio Andri",
    images: [
      {
        url: "/opengraph-image", // ← Next.js otomatis generate
        width: 1200,
        height: 630,
        alt: "Portfolio Andri",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio Andri | Creative Developer",
    description:
      "Web Developer kreatif dengan fokus pada desain interaktif & teknologi modern.",
    images: ["/opengraph-image"],
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
