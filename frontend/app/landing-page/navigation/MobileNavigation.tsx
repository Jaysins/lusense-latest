"use client";

import { useState, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { X } from "lucide-react";

const MobileNavigation = ({
  isLoggedIn = false,
  profileName = "",
  onOpenLogin,
  onOpenSignup,
}: {
  isLoggedIn?: boolean;
  profileName?: string;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));

  const userInitial = profileName?.charAt(0).toUpperCase() || "U";

  const handleLogin = () => {
    setIsOpen(false);
    // Small delay lets the menu animate out before the modal appears
    setTimeout(onOpenLogin, 150);
  };

  const handleSignup = () => {
    setIsOpen(false);
    setTimeout(onOpenSignup, 150);
  };

  return (
    <div ref={ref} className="flex justify-end relative z-0">
      <Hamburger
        toggled={isOpen}
        size={24}
        toggle={() => setIsOpen((prev) => !prev)}
        duration={0.4}
        color="#000"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-white z-200 flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold text-[#0504AA] text-xl tracking-tighter">
              LuSense
            </span>
            <X size={30} className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          <ul className="flex flex-col gap-y-4 text-xl font-bold text-black">
            <li><Link href="#about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="#business" onClick={() => setIsOpen(false)}>Business</Link></li>
            <li><Link href="#blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
          </ul>

          <div className="mt-auto flex flex-col gap-y-4 mb-10">
            {!isLoggedIn ? (
              <>
                <button
                  className="bg-[#0504AA] text-white px-4 py-3 rounded-full font-semibold text-sm hover:bg-[#050599] transition-colors cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="w-full bg-[#efefef] text-black py-3 rounded-full font-bold text-lg hover:bg-[#e2e2e2] cursor-pointer"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-x-4 p-4 bg-gray-50 rounded-2xl">
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                  {userInitial}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{profileName}</span>
                  <button className="text-sm text-gray-500 text-left underline">Log out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;