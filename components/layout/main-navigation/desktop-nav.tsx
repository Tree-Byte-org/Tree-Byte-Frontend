"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DesktopNavProps {
  scrolled: boolean;
  pathname: string;
}

export function DesktopNav({ scrolled, pathname }: DesktopNavProps) {
  const isHomePage = pathname === "/";
  const textColorClass = isHomePage && !scrolled && "text-white";

  return (
    <div className="w-full px-40">
      {/* Main navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className={cn("font-bold text-4xl", textColorClass)}>
            TreeByte
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/projects"
            className={cn(
              "transition-colors hover:text-green-400",
              textColorClass
            )}
          >
            Projects
          </Link>
          <Link
            href="/benefits"
            className={cn(
              "transition-colors hover:text-green-400",
              textColorClass
            )}
          >
            Benefits
          </Link>
          <Link
            href="/contact"
            className={cn(
              "transition-colors hover:text-green-400",
              textColorClass
            )}
          >
            Contact
          </Link>
          <Link
            href="/about"
            className={cn(
              "transition-colors hover:text-green-400",
              textColorClass
            )}
          >
            About
          </Link>
          <Link
            href="/login"
            className={cn(
              "transition-colors hover:text-green-400",
              textColorClass
            )}
          >
            Login
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* White horizontal line */}
      {!scrolled && <div className="h-px bg-white w-full"></div>}
    </div>
  );
}
