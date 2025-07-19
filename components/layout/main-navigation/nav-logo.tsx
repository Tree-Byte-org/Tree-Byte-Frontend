"use client";

import Link from "next/link";
import { TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavLogo({
  scrolled,
  pathname,
  isOpen,
}: {
  scrolled: boolean;
  pathname: string;
  isOpen: boolean;
}) {
  return (
    <Link href="/" className="flex items-center space-x-2 z-50">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
          scrolled || pathname !== "/" || isOpen
            ? "bg-green-100"
            : "bg-white/20 backdrop-blur-sm"
        )}
      >
        <TreePine
          className={cn(
            "h-6 w-6 transition-colors",
            scrolled || pathname !== "/" || isOpen
              ? "text-green-600"
              : "text-white"
          )}
        />
      </div>
      <span
        className={cn(
          "font-bold text-xl transition-colors",
          scrolled || pathname !== "/" || isOpen
            ? "text-gray-900"
            : "text-white"
        )}
      >
        TreeByte
      </span>
    </Link>
  );
}
