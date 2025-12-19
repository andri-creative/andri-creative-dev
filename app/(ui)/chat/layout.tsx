"use client";

import { useAuth } from "@/context/AuthContext";
import { Box } from "@radix-ui/themes";

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
    <Box style={{
      minHeight: '90vh',
      backgroundColor: 'var(--red-8)',
    }}>
      {children}
    </Box>
  );
}
