// lib/api.ts
export async function fetchDashboardData() {
  const res = await fetch("http://localhost:8000/api/dashboard", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}
