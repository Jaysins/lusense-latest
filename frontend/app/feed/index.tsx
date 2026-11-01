"use client";
import { useEffect } from "react";
import { Sidebar } from "../components/widgets/sidebar";
import TopBar from "../components/widgets/topbar";
import Feed from "./Feed";
import { useAuth } from "@/app/state/client/provider";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/");
    }
  }, [user, hydrated, router]);

  if (!hydrated) return null;

  if (!user) return null;

  return (
    <div>
      <Sidebar />

      <main className="pl-0 md:pl-20">
        <TopBar />
        <Feed />
      </main>
    </div>
  );
}


