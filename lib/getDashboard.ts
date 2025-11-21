// lib/getDashboard.ts
import type { DashboardData } from "@/types/dashboard/dashboard";

export async function getDashboard(): Promise<DashboardData | null> {
  try {
    const res = await fetch(
      "https://backend-ts-lemon.vercel.app/api/dashboard",
      { next: { revalidate: 30 } } // 👈 INI bagian yang kamu maksud
    );

    if (!res.ok) throw new Error("Failed to fetch dashboard");

    return await res.json();
  } catch (err) {
    console.error("Dashboard API error:", err);
    return null;
  }
}
