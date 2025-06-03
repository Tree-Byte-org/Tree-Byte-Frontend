"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "../lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "zoom-in"
  id?: string
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  animation = "fade-up",
  id,
  ...props
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.15,
        rootMargin: "-50px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8 transition-all duration-700 ease-out",
    "fade-in": "opacity-0 transition-opacity duration-700 ease-out",
    "slide-in-right": "opacity-0 translate-x-8 transition-all duration-700 ease-out",
    "slide-in-left": "opacity-0 -translate-x-8 transition-all duration-700 ease-out",
    "zoom-in": "opacity-0 scale-95 transition-all duration-700 ease-out",
  }

  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100"

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(animationClasses[animation], isVisible && visibleClass, className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </section>
  )
}
