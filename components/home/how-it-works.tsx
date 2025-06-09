import { Card, CardContent } from "@/components/ui/card"
import { TreePine, Award, Plane, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export function HowItWorks() {
  const steps = [
    {
      icon: TreePine,
      title: "Choose a tree",
      description: "Select an associated farm or conservation area.",
      color: "bg-green-500",
    },
    {
      icon: Award,
      title: "Receive your NFT",
      description: "With unique metadata: species, GPS, photo, CO₂ captured.",
      color: "bg-emerald-500",
    },
    {
      icon: Plane,
      title: "Visit your tree",
      description: "Plan your regenerative trip, stay at a farm and plant directly.",
      color: "bg-green-600",
    },
    {
      icon: Users,
      title: "Tracking and community",
      description: "Your NFT evolves with each visit. Receive updates, levels and benefits.",
      color: "bg-emerald-600",
    },
  ]

  return (
    <AnimatedSection id="how-it-works" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How it works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple and transparent process that connects your digital action with real environmental impact
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={200 * index}>
                  <Card className="relative border-green-200 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div
                          className={`w-16 h-16 ${step.color} rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <step.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold text-green-800">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="slide-in-right" delay={400}>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Tree Byte NFT</h3>
                <div className="relative inline-block">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2018%20may%202025%2C%2008_57_44%20a.m.-iQiCUlagUoq0xz0w18ULBvAYU8wYYo.png"
                    alt="Tree Byte NFT Example - Guanacaste"
                    className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Your real impact!
                  </div>
                </div>
                <p className="text-gray-600 mt-6 max-w-md mx-auto">
                  Each NFT contains verifiable data from your tree: GPS location, species, CO₂ captured and updated
                  photos.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
