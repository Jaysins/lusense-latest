"use client";
import { Button } from "../components/widgets/button";
import Image from "next/image";
import { useState } from "react";
import Login from "./components/Login";
import Create from "./components/Create";

export default function Hero() {
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen">
      {/* Text — left side */}
      <div className="relative flex flex-col justify-center pt-22.5 pb-8 px-6 md:pt-0 md:pb-28 md:px-12 md:w-[45%] md:min-h-screen">
        <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-[#2e1b4a] leading-[0.9] tracking-tight mb-9 text-center md:text-left">
          Make your dream space come alive
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8 md:mb-0">
          <Create
            open={authModal === "signup"}
            onOpenChange={(open) => setAuthModal(open ? "signup" : null)}
            onSwitch={() => setAuthModal("login")}
            trigger={
              <Button
                className="px-8 py-3 font-medium w-full sm:w-auto"
                onClick={() => setAuthModal("signup")}
              >
                Join for free
              </Button>
            }
          />

          <Login
            open={authModal === "login"}
            onOpenChange={(open) => setAuthModal(open ? "login" : null)}
            onSwitch={() => setAuthModal("signup")}
            trigger={
              <Button
                className="px-8 py-3 font-medium w-full sm:w-auto"
                onClick={() => setAuthModal("login")}
              >
                I already have an account
              </Button>
            }
          />
        </div>
      </div>

      {/* Image — right side, bleeds into navbar and right edge */}
      <div className="relative w-full h-[52vw] min-h-55 md:absolute md:top-10 md:right-0 md:bottom-0 md:w-[58%] md:h-auto">
        <Image
          src="/hero.png"
          alt="dream interior space"
          fill
          sizes=""
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
