"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function useMainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

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
        { threshold: 0.3 }
      )

      sections.forEach((section) => section.id && observer.observe(section))
      return () => {
        sections.forEach((section) => section.id && observer.unobserve(section))
      }
    }

    window.addEventListener("scroll", handleScroll)
    let cleanup: () => void

    if (pathname === "/") {
      cleanup = observeSections()
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cleanup?.()
    }
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.includes("#")) {
      const sectionId = href.split("#")[1]
      return activeSection === sectionId || pathname + "#" + activeSection === href
    }
    return pathname === href
  }

  return {
    isOpen,
    setIsOpen,
    scrolled,
    pathname,
    isActive,
  }
}
