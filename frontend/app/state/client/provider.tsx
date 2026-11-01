"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  hydrated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function formatUser(user: SupabaseUser | null): User {
  if (!user) return null;

  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

const initializeAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (!active) return;

    if (error) {
      console.error("Session initialization:", error.message);
    }

    setUser(formatUser(data.session?.user ?? null));
  } catch (error) {
    if (active) {
      console.error("Auth initialization failed:", error);
      setUser(null);
    }
  } finally {
    if (active) setHydrated(true);
  }
};

    void initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      setUser(formatUser(session?.user ?? null));
      setHydrated(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    setUser(formatUser(data.user));
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        hydrated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
