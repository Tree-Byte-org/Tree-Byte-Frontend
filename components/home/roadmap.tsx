import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Clock, Globe } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export function Roadmap() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Operational MVP",
      description: "NFTs + adoption + 3 farms",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      phase: "Phase 2",
      title: "Web platform + property dashboard",
      description: "Complete dashboard and NFT management",
      status: "current",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      phase: "Phase 3",
      title: "Partnerships with banks, hotels and tokenization",
      description: "Ecosystem expansion and strategic partnerships",
      status: "upcoming",
      icon: Circle,
      color: "text-gray-400",
    },
    {
      phase: "Phase 4",
      title: "International scaling and carbon credits",
      description: "Global expansion and carbon market",
      status: "upcoming",
      icon: Globe,
      color: "text-gray-400",
    },
  ]

  return (
    <AnimatedSection id="roadmap" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Roadmap</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our growth plan with clear execution and measurable objectives
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200 hidden md:block"></div>

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <AnimatedSection key={index} animation="slide-in-right" delay={200 * index}>
                  <Card
                    className={`border-green-200 hover:shadow-lg transition-shadow ml-0 md:ml-20 ${
                      phase.status === "current" ? "ring-2 ring-green-300" : ""
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            phase.status === "completed"
                              ? "bg-green-100"
                              : phase.status === "current"
                                ? "bg-blue-100"
                                : "bg-gray-100"
                          }`}
                        >
                          <phase.icon className={`h-6 w-6 ${phase.color}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                phase.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : phase.status === "current"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {phase.phase}
                            </span>
                            {phase.status === "completed" && (
                              <span className="text-green-600 text-sm font-medium">✅ Completed</span>
                            )}
                            {phase.status === "current" && (
                              <span className="text-blue-600 text-sm font-medium">🔄 In progress</span>
                            )}
                          </div>

                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{phase.title}</h3>
                          <p className="text-gray-600 mb-4">{phase.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection animation="fade-up" delay={800}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Download the whitepaper
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Join Discord
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  )
}
