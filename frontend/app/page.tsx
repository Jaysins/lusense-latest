"use client";

import FeedPage from "./feed";
import LandingPage from "./landing-page";
import { useAuth } from "./state/client/provider";

export default function Home() {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return null;
  }

  return user ? <FeedPage /> : <LandingPage />;
}
