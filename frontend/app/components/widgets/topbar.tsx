"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Mic, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/state/client/provider";
import { useRouter } from "next/navigation";

function AvatarCircle({
  name,
  avatar,
  className = "",
}: {
  name: string;
  avatar?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`rounded-full object-cover block shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-[#6d6560] flex items-center justify-center text-white font-bold select-none shrink-0 ${className}`}
    >
      {initials}
    </div>
  );
}

function ProfileDropdown({
  user,
  onClose,
}: {
  user: { name: string; email: string; avatar?: string };
  onClose: () => void;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden">
      <Link
        href="#profile"
        className="flex items-center gap-3 px-4 py-4 hover:bg-neutral-50"
      >
        <AvatarCircle
          name={user.name}
          avatar={user.avatar}
          className="w-10 h-10"
        />
        <div>
          <p className="font-semibold text-neutral-900">{user.name}</p>
          <p className="text-sm text-neutral-500">{user.email}</p>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 text-left border-t border-neutral-100 text-red-600 hover:bg-neutral-50 cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}

export default function TopBar() {
  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  const { user } = useAuth();

  if (!user) return null;

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="sticky top-0 z-50 bg-white px-4 py-5 flex items-center justify-between gap-3"
    >
      {/* Search */}
      <div
        className={`
      flex flex-1 items-center h-10 rounded-full px-3 gap-2 transition-all duration-150
      ${
        searchFocused
          ? "bg-white border-2 border-[#0504AA]"
          : "bg-neutral-100 border-2 border-transparent"
      }
      min-w-0
    `}
      >
        <Search
          size={18}
          className="shrink-0 text-neutral-500"
          strokeWidth={2.5}
        />
        <input
          type="search"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm sm:text-base text-neutral-900 placeholder:text-neutral-500"
        />
        <button
          aria-label="Search by voice"
          className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full hover:bg-black/6 transition-colors duration-150"
        >
          <Mic size={18} className="text-neutral-900" strokeWidth={2} />
        </button>
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative flex items-center gap-1">
        <Link href="#profile">
          <AvatarCircle name={user.name} className="w-9 h-9 cursor-pointer" />
        </Link>

        <button
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="Account menu"
          className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
        >
          <ChevronDown
            size={16}
            className="text-neutral-500"
            strokeWidth={2.5}
          />
        </button>

        {dropdownOpen && (
          <ProfileDropdown user={user} onClose={closeDropdown} />
        )}
      </div>
    </div>
  );
}
