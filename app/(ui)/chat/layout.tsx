"use client";

import { useAuth } from "@/context/AuthContext";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen ">
      <aside className="w-64 border-r border-gray-800">Sidebar</aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
