"use client"

import { cn } from "@/lib/utils"
import { useMainNavigation } from "@/hooks/layout/use-main-navigation"
import { DesktopNav } from "./main-navigation/desktop-nav"
import { MobileNav } from "./main-navigation/mobile-nav"
import { NavLogo } from "./main-navigation/nav-logo"
import { CtaButton } from "./main-navigation/cta-button"
import { Menu, X } from "lucide-react"

export function MainNavigation() {
  const { isOpen, setIsOpen, scrolled, pathname } = useMainNavigation()

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/" || isOpen ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLogo scrolled={scrolled} pathname={pathname} isOpen={isOpen} />
        <DesktopNav />
        <div className="hidden lg:block">
          <CtaButton scrolled={scrolled} pathname={pathname} />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden z-50 p-2 rounded-md" aria-label="Toggle menu">
          {isOpen ? (
            <X className={cn("h-6 w-6", scrolled || pathname !== "/" ? "text-gray-900" : "text-white")} />
          ) : (
            <Menu className={cn("h-6 w-6", scrolled || pathname !== "/" ? "text-gray-900" : "text-white")} />
          )}
        </button>
      </div>
      <MobileNav />
    </header>
  )
}
