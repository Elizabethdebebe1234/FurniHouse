
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function ProtectedRoute({ role, children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace(role === "admin" ? "/admin/login" : "/login");
      return;
    }

    if (user.role !== role) {
      router.replace(user.role === "admin" ? "/admin" : "/account");
    }
  }, [user, ready, role, router]);

  if (!ready || !user || user.role !== role) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F6EF]">
        <p className="text-[#173D2E]">Checking your account...</p>
      </div>
    );
  }

  return children;
}
