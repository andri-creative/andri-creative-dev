// components/providers/ProtectedPage.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { ReactNode } from "react";

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Please login to access this page</h2>
        <button onClick={() => signIn("google")}>Login with Google</button>
        <button onClick={() => signIn("github")}>Login with GitHub</button>
      </div>
    );
  }

  return <>{children}</>;
}
