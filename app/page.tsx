import { HeroSection } from "@/components/hero-section"
import { WhatIsTreeByte } from "@/components/what-is-tree-byte"
import { HowItWorks } from "@/components/how-it-works"
import { EcosystemPillars } from "@/components/ecosystem-pillars"
import { UserBenefits } from "@/components/user-benefits"
import { InteractiveMap } from "@/components/interactive-map"
import { Roadmap } from "@/components/roadmap"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

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
