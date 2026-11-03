"use client";
import Feed from "./Feed";
import { useAuth } from "@/app/state/client/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function FeedPage() {
  const { user, hydrated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);
  if (!hydrated || !user) return <div className="p-8">Loading feed…</div>;
  return <Feed />;
}
