"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useMainNavigation } from "@/hooks/layout/use-main-navigation"
import { cn } from "@/lib/utils"
import { navItems } from "@/data/nav-items"

export function DesktopNav() {
  const { isActive, pathname, scrolled } = useMainNavigation()

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {navItems.map((item) => (
        <div key={item.name} className="relative group">
          <Link
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-md flex items-center transition-all",
              isActive(item.href)
                ? "text-green-600 font-medium"
                : scrolled || pathname !== "/"
                  ? "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  : "text-white hover:text-green-200 hover:bg-white/10"
            )}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.name}
            {item.children && (
              <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
            )}
          </Link>

          {item.children && (
            <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
              <div className="py-1">
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-green-50",
                      isActive(child.href) ? "text-green-600 font-medium" : "text-gray-700"
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
