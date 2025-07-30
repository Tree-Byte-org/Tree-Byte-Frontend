"use client";

import { cn } from "@/lib/utils";
import { useMainNavigation } from "@/hooks/layout/use-main-navigation";
import { DesktopNav } from "./main-navigation/desktop-nav";
import { MobileNav } from "./main-navigation/mobile-nav";
import { Menu, X } from "lucide-react";

export function MainNavigation() {
  const { isOpen, setIsOpen, scrolled, pathname } = useMainNavigation();

  return (
    <header
      className={cn(
        pathname === "/" && "fixed",
        "top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <DesktopNav scrolled={scrolled} pathname={pathname} />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 rounded-md transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X
              className={cn(
                "h-6 w-6 transition-colors duration-300",
                scrolled || pathname !== "/"
                  ? "text-gray-900 dark:text-white"
                  : "text-white"
              )}
            />
          ) : (
            <Menu
              className={cn(
                "h-6 w-6 transition-colors duration-300",
                scrolled || pathname !== "/"
                  ? "text-gray-900 dark:text-white"
                  : "text-white"
              )}
            />
          )}
        </button>
      </div>
      <MobileNav />
    </header>
  );
}
