"use client";

import { type PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../icons/spinner";

type Props = {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  children,
  type,
  onClick,
  className,
  loading = false,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        "bg-linear-to-r from-foreground to-[#0504AA] text-white px-6 py-2 rounded-md hover:text-[#e5e5e5] cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out",
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={loading || false}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
