"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { setAuthFromToken } = useAuth();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = params.get("token");

    if (token) {
      setAuthFromToken(token);
    }

    router.replace("/chat");
  }, [router, setAuthFromToken, params]);

  return null;
}
