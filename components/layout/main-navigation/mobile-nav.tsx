"use client"

import Link from "next/link"
import { ChevronDown, Heart } from "lucide-react"
import { useMainNavigation } from "@/hooks/layout/use-main-navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navItems } from "@/data/nav-items"

export function MobileNav() {
  const { isOpen, setIsOpen, isActive } = useMainNavigation()

  return (
    <div
      className={cn(
        "fixed inset-0 bg-green-900/95 z-40 lg:hidden flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="container mx-auto px-4 pt-24 pb-8 h-full overflow-y-auto">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="space-y-2">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md flex items-center justify-between text-lg",
                  isActive(item.href)
                    ? "bg-white/20 text-white font-medium"
                    : "text-green-100 hover:bg-white/10"
                )}
              >
                <span className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </span>
                {item.children && <ChevronDown className="h-5 w-5" />}
              </Link>

              {item.children && (
                <div className="ml-8 space-y-1 border-l-2 border-green-700 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-2 rounded-md",
                        isActive(child.href)
                          ? "text-white font-medium bg-white/10"
                          : "text-green-200 hover:bg-white/5"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8">
          <Button asChild className="w-full bg-white text-green-700 hover:bg-green-50" size="lg">
            <Link href="/adopt" onClick={() => setIsOpen(false)}>
              <Heart className="mr-2 h-5 w-5" />
              Adopt a Tree
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
