"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

interface DesktopNavProps {
  scrolled: boolean;
  pathname: string;
}

export function DesktopNav({ scrolled, pathname }: DesktopNavProps) {
  const isHomePage = pathname === "/";

  return (
    <div className="w-full px-40">
      {/* Main navigation */}
      <nav
        className={`hidden lg:flex items-center justify-between w-full px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl mx-4"
            : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <span
            className={`font-bold text-4xl transition-colors duration-300 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            TreeByte
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/projects"
            className={`transition-all duration-300 hover:text-green-400 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/benefits"
            className={`transition-all duration-300 hover:text-green-400 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Benefits
          </Link>
          <Link
            href="/contact"
            className={`transition-all duration-300 hover:text-green-400 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/about"
            className={`transition-all duration-300 hover:text-green-400 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            About
          </Link>
          <Link
            href="/login"
            className={`transition-all duration-300 hover:text-green-400 ${
              pathname === "/" && !scrolled
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Login
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* White horizontal line */}
      {!scrolled && (
        <div
          className={`h-px ${
            pathname === "/" ? "bg-white" : "bg-black"
          } w-full`}
        ></div>
      )}
    </div>
  );
}
