"use client";

import { useAuth } from "@/context/AuthContext";
import LoginPrompt from "@/components/chat/auth/LoginPrompt";
import ProfileChat from "@/components/chat/Profile";
import MaintenancePage from "../maintenance/page";

export default function ChatPage() {
  const { user, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <p>Loading auth...</p>;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <ProfileChat />
      <MaintenancePage />
    </div>
  );
}
