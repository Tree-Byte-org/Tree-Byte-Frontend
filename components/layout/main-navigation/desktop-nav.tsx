"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  scrolled: boolean;
  pathname: string;
}

export function DesktopNav({ scrolled, pathname }: DesktopNavProps) {
  return (
    <div className="w-full px-40">
      {/* Main navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-bold text-4xl text-white">TreeByte</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/projects"
            className="text-white hover:text-green-400 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/benefits"
            className="text-white hover:text-green-400 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-green-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/login"
            className="text-white hover:text-green-400 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* White horizontal line */}
      {!scrolled && <div className="h-px bg-white w-full"></div>}
    </div>
  );
}
