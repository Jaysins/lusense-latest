"use client";
import { useState } from "react";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import Login from "../components/Login";
import Create from "../components/Create";

export type AuthModal = "login" | "signup" | null;

const Navigation = () => {
  const [authModal, setAuthModal] = useState<AuthModal>(null);
  const isLoggedIn = false;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10 bg-white px-4 md:px-8 pt-7 pb-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-x-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-[#0504AA] font-bold text-xl tracking-tighter"
          >
            <div className="w-8 h-8 bg-[#0504AA] rounded-full flex items-center justify-center text-white text-xs">
              LS
            </div>
            <span className="hidden md:block text-[#0504AA]">LuSense</span>
          </Link>
          <Link href="/" className="flex items-center font-semibold">
            Explore
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <ul className="hidden sm:flex items-center gap-x-8 ml-4 font-semibold">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#business">Business</Link></li>
            <li><Link href="#blog">Blog</Link></li>
          </ul>

          {!isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-x-4">
              <Login
                open={authModal === "login"}
                onOpenChange={(open) => setAuthModal(open ? "login" : null)}
                onSwitch={() => setAuthModal("signup")}
                trigger={
                  <button
                    className="bg-[#0504AA] text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#050599] transition-colors cursor-pointer"
                    onClick={() => setAuthModal("login")}
                  >
                    Login
                  </button>
                }
              />
              <Create
                open={authModal === "signup"}
                onOpenChange={(open) => setAuthModal(open ? "signup" : null)}
                onSwitch={() => setAuthModal("login")}
                trigger={
                  <button className="cursor-pointer" onClick={() => setAuthModal("signup")}>Sign up</button>
                }
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold">U</span>
            </div>
          )}

          <div className="block sm:hidden ml-2">
            <MobileNavigation
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => setAuthModal("login")}
              onOpenSignup={() => setAuthModal("signup")}
            />
          </div>
        </div>
      </nav>

      {/* Modals live here — outside the mobile menu — so they survive menu close */}
      <Login
        open={authModal === "login"}
        onOpenChange={(open) => setAuthModal(open ? "login" : null)}
        onSwitch={() => setAuthModal("signup")}
      />
      <Create
        open={authModal === "signup"}
        onOpenChange={(open) => setAuthModal(open ? "signup" : null)}
        onSwitch={() => setAuthModal("login")}
      />

      <div className="h-23.75" />
    </>
  );
};

export default Navigation;