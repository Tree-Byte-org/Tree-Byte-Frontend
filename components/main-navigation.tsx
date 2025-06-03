"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TreePine, Menu, X, ChevronDown, Heart, Users, Globe, Leaf, BookOpen, MapPin } from "lucide-react"
import { cn } from "../lib/utils"

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  // Handle scroll events for transparent/solid header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Track sections for active state
    const observeSections = () => {
      const sections = document.querySelectorAll("section")

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { threshold: 0.3 },
      )

      sections.forEach((section) => {
        if (section.id) {
          observer.observe(section)
        }
      })

      return () => {
        sections.forEach((section) => {
          if (section.id) {
            observer.unobserve(section)
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Only observe sections on homepage
    if (pathname === "/") {
      const cleanup = observeSections()
      return () => {
        cleanup()
        window.removeEventListener("scroll", handleScroll)
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: TreePine,
    },
    {
      name: "About",
      href: "/#about",
      icon: BookOpen,
      children: [
        { name: "What is Tree Byte", href: "/#what-is-tree-byte" },
        { name: "How it works", href: "/#how-it-works" },
        { name: "Ecosystem pillars", href: "/#ecosystem-pillars" },
      ],
    },
    {
      name: "Benefits",
      href: "/#benefits",
      icon: Leaf,
      children: [
        { name: "For individuals", href: "/#benefits-individuals" },
        { name: "For companies", href: "/#benefits-companies" },
        { name: "For farms", href: "/#benefits-farms" },
      ],
    },
    {
      name: "Farms",
      href: "/#farms",
      icon: MapPin,
    },
    {
      name: "Roadmap",
      href: "/#roadmap",
      icon: Globe,
    },
    {
      name: "Community",
      href: "/#community",
      icon: Users,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.includes("#")) {
      const sectionId = href.split("#")[1]
      return activeSection === sectionId || pathname + "#" + activeSection === href
    }
    return pathname === href
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/" || isOpen ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                scrolled || pathname !== "/" || isOpen ? "bg-green-100" : "bg-white/20 backdrop-blur-sm",
              )}
            >
              <TreePine
                className={cn(
                  "h-6 w-6 transition-colors",
                  scrolled || pathname !== "/" || isOpen ? "text-green-600" : "text-white",
                )}
              />
            </div>
            <span
              className={cn(
                "font-bold text-xl transition-colors",
                scrolled || pathname !== "/" || isOpen ? "text-gray-900" : "text-white",
              )}
            >
              Tree Byte
            </span>
          </Link>

          {/* Desktop Navigation */}
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
                        : "text-white hover:text-green-200 hover:bg-white/10",
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown for items with children */}
                {item.children && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm hover:bg-green-50",
                            isActive(child.href) ? "text-green-600 font-medium" : "text-gray-700",
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={cn(
                "transition-all",
                scrolled || pathname !== "/"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-white text-green-700 hover:bg-green-50",
              )}
            >
              <Link href="/adopt">
                <Heart className="mr-2 h-4 w-4" />
                Adopt a Tree
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden z-50 p-2 rounded-md" aria-label="Toggle menu">
            {isOpen ? (
              <X
                className={cn(
                  "h-6 w-6 transition-colors",
                  scrolled || pathname !== "/" ? "text-gray-900" : "text-white",
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "h-6 w-6 transition-colors",
                  scrolled || pathname !== "/" ? "text-gray-900" : "text-white",
                )}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-green-900/95 z-40 lg:hidden flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
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
                    isActive(item.href) ? "bg-white/20 text-white font-medium" : "text-green-100 hover:bg-white/10",
                  )}
                >
                  <span className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </span>
                  {item.children && <ChevronDown className="h-5 w-5" />}
                </Link>

                {/* Mobile dropdown items */}
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
                            : "text-green-200 hover:bg-white/5",
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

          {/* Social links for mobile */}
          <div className="mt-auto pt-8 flex justify-center space-x-6">
            <a href="#" className="text-green-200 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-green-200 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-green-200 hover:text-white">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
