import { HeroSection } from "@/components/home/hero-section"
import { WhatIsTreeByte } from "@/components/home/what-is-tree-byte"
import { HowItWorks } from "@/components/home/how-it-works"
import { EcosystemPillars } from "@/components/home/ecosystem-pillars"
import { UserBenefits } from "@/components/home/user-benefits"
import { InteractiveMap } from "@/components/home/interactive-map"
import { Roadmap } from "@/components/home/roadmap"
import { Testimonials } from "@/components/home/testimonials"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HeroSection />
      <WhatIsTreeByte />
      <HowItWorks />
      <EcosystemPillars />
      <UserBenefits />
      <InteractiveMap />
      <Roadmap />
      <Testimonials />
      <Footer />
    </div>
  )
}
