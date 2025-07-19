import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function Testimonials() {
  const testimonials = [
    {
      name: "Carla Q.",
      role: "digital nomad",
      content:
        "I adopted a tree in Turrialba and was able to plant it myself. I never imagined an NFT could feel so real.",
      rating: 5,
      avatar: "🌱",
    },
    {
      name: "Miguel R.",
      role: "tech startup CEO",
      content:
        "We implemented TreeByte in our company to offset our digital footprint. The metrics dashboard is incredible for our ESG reports.",
      rating: 5,
      avatar: "🚀",
    },
    {
      name: "Ana Sofía M.",
      role: "farm owner",
      content:
        "TreeByte opened up a new sustainable income source for us. Now our trees generate value while we conserve the forest.",
      rating: 5,
      avatar: "🌳",
    },
  ];

  return (
    <AnimatedSection id="community" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Testimonials and validation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                What our early adopters and partners say
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={200 * index}
              >
                <Card className="border-green-200 hover:shadow-xl transition-all duration-300 group hover-card-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <Quote className="h-8 w-8 text-green-200 absolute -top-2 -left-2" />
                      <p className="text-gray-700 italic leading-relaxed pl-6">
                        "{testimonial.content}"
                      </p>
                    </div>

                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
