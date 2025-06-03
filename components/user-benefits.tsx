import { AnimatedSection } from "@/components/animated-section"
import { CheckCircle } from "lucide-react"

export function UserBenefits() {
  const userTypes = [
    {
      title: "For individuals",
      subtitle: "Personal Environmental Impact",
      benefits: [
        "Digital footprint compensation",
        "NFT as a symbol of impact",
        "Regenerative experiences and emotional connection",
      ],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/for-individuals-hw0NxCCn53HGDYxI4Pm0mE4icafE5x.png",
      id: "benefits-individuals",
      accent: "border-green-500",
    },
    {
      title: "For companies",
      subtitle: "Corporate Sustainability Solutions",
      benefits: [
        "Corporate ESG packages",
        "Metrics dashboard for sustainability reports",
        "Branding with environmental impact",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/for-companies-Z7W86MILsz1k30EDLHjby4eHoQHiwM.png",
      id: "benefits-companies",
      accent: "border-emerald-500",
    },
    {
      title: "For farms",
      subtitle: "Sustainable Revenue Streams",
      benefits: [
        "New sustainable income streams",
        "Tree registration for tokenization or conservation",
        "Offering ecological experiences on the platform",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/for-farms-U48eaLY359I3wNRCPEzPEIiSGJimCW.png",
      id: "benefits-farms",
      accent: "border-green-600",
    },
  ]

  return (
    <AnimatedSection id="benefits" className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Benefits by user type</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Personalized solutions for every need in the Tree Byte ecosystem
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={200 * index}>
                <div
                  id={type.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 ${type.accent} hover:shadow-xl transition-shadow duration-300 h-[600px] flex flex-col`}
                >
                  {/* Image */}
                  <div className="h-64 overflow-hidden flex-shrink-0">
                    <img
                      src={type.image || "/placeholder.svg"}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg">{type.subtitle}</p>

                    <div className="space-y-4 flex-grow">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom CTA */}
          <AnimatedSection animation="fade-up" delay={800}>
            <div className="text-center mt-20">
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to make a difference?</h3>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of individuals, companies, and farms already making a positive environmental impact
                  through Tree Byte.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Get started today
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  )
}
