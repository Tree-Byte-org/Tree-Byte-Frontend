import { Card, CardContent } from "@/components/ui/card";
import { MapPin, TreePine, Users, Camera } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function InteractiveMap() {
  const farms = [
    {
      name: "Verde Turrialba Farm",
      location: "Turrialba, Cartago",
      trees: 1250,
      activities: ["Planting", "Hiking", "Bird watching"],
      availability: "Available",
      coordinates: { x: 60, y: 45 },
    },
    {
      name: "Monteverde Reserve",
      location: "Monteverde, Puntarenas",
      trees: 890,
      activities: ["Canopy", "Planting", "Eco-tourism"],
      availability: "Available",
      coordinates: { x: 35, y: 30 },
    },
    {
      name: "Pérez Zeledón Organic Farm",
      location: "Pérez Zeledón, San José",
      trees: 2100,
      activities: ["Organic farming", "Planting", "Lodging"],
      availability: "Coming soon",
      coordinates: { x: 45, y: 70 },
    },
  ];

  return (
    <AnimatedSection id="farms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Active farms in Costa Rica
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore the locations where you can adopt trees and experience
                regenerative activities
              </p>
            </div>
          </AnimatedSection>

          {/* Costa Rica Landscape Hero */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mb-12 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/costa-rica-2400159_1920.jpg-IStszkptDaklXffjPE7uQn9PLtBoeh.jpeg"
                  alt="Costa Rica mountainous landscape - Forests and conservation"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Costa Rica's Forests
                  </h3>
                  <p className="text-green-200 flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Where your TreeByte trees are born
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Interactive Map */}
            <AnimatedSection animation="slide-in-left" delay={400}>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 h-96 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Costa Rica outline (simplified) */}
                      <path
                        d="M10,40 Q20,30 40,35 Q60,25 80,30 Q90,35 85,50 Q80,65 70,70 Q50,75 30,70 Q15,65 10,50 Z"
                        fill="currentColor"
                        className="text-green-300"
                      />
                    </svg>
                  </div>

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-gray-800">
                      Interactive Map
                    </h4>
                    <p className="text-xs text-gray-600">TreeByte Farms</p>
                  </div>

                  {farms.map((farm, index) => (
                    <div
                      key={index}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${farm.coordinates.x}%`,
                        top: `${farm.coordinates.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="font-semibold text-sm">{farm.name}</p>
                        <p className="text-xs text-gray-600">
                          {farm.trees} trees
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Farm Details */}
            <AnimatedSection animation="slide-in-right" delay={600}>
              <div className="space-y-6">
                {farms.map((farm, index) => (
                  <Card
                    key={index}
                    className="border-green-200 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <MapPin className="h-5 w-5 text-green-600 mr-2" />
                            {farm.name}
                          </h3>
                          <p className="text-gray-600">{farm.location}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            farm.availability === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {farm.availability}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <TreePine className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-600">
                            {farm.trees} trees
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-600">
                            {farm.activities.length} activities
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {farm.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
