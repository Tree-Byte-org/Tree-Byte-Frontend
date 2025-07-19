import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Shield, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function WhatIsTreeByte() {
  return (
    <AnimatedSection id="what-is-tree-byte" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection animation="slide-in-left" delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                What is TreeByte?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                TreeByte is a Web3 platform that converts technology usage into
                real environmental actions through the adoption of trees
                represented by dynamic NFTs. We connect users, companies, and
                conservation farms in a regenerative, transparent, and traceable
                network on blockchain.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right" delay={400}>
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bird-3331816_1280.jpg-Kf4H8elofLRIEGS64FRN6l0SwonRuQ.jpeg"
                  alt="Costa Rican toucan - Costa Rica's biodiversity"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Costa Rica's Biodiversity
                  </p>
                  <p className="text-xs text-gray-600">
                    We protect unique ecosystems
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Blockchain + Reforestation",
                description: "Decentralized technology serving the environment",
                delay: 300,
              },
              {
                icon: Leaf,
                title: "NFTs with real impact",
                description:
                  "Each token represents a real tree with verifiable data",
                delay: 500,
              },
              {
                icon: MapPin,
                title: "Regenerative tourism in Costa Rica",
                description:
                  "Visit your tree and experience conservation firsthand",
                delay: 700,
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={item.delay}
              >
                <Card className="border-green-200 hover:shadow-lg transition-shadow hover-card-glow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <item.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
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
