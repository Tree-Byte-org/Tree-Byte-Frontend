"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TreePine, Users, Star, Heart, ArrowRight } from "lucide-react"

const farms = [
  {
    id: 1,
    name: "Verde Turrialba Farm",
    location: "Turrialba, Cartago",
    owner: "Don Carlos Méndez",
    story:
      "Don Carlos inherited this land from his grandfather 30 years ago. After decades dedicated to traditional cattle ranching, he decided to transform his farm into a regeneration model. 'I want to leave my grandchildren a better world,' he says as he walks among the trails he traced himself.",
    mission:
      "Convert degraded pastures into thriving forests, creating biological corridors that connect existing forest fragments.",
    trees: 1250,
    species: ["Cecropia", "Guarumo", "Oak"],
    activities: ["Direct planting", "Hiking", "Bird watching", "Rural lodging"],
    impact: "21.6 tons CO₂/year",
    price: 25,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Image-2018-07-24-at-1.29.54-PM.jpeg-tExYHZlWL4OjwG2mS8mxKuN1uRMvVS.webp",
    rating: 4.9,
    reviews: 127,
    availability: "Available",
  },
  {
    id: 2,
    name: "Monteverde Reserve",
    location: "Monteverde, Puntarenas",
    owner: "Rodríguez Family",
    story:
      "The Rodríguez family came to Monteverde in the 80s as part of the conservationist movement. María Elena and José have dedicated their lives to protecting the cloud forest. 'Every tree we plant is a promise for future generations,' explains María while pointing to the canopy that extends as far as the eye can see.",
    mission:
      "Protect and expand Monteverde's unique cloud forest, home to endemic species like the resplendent quetzal.",
    trees: 890,
    species: ["Quetzal Tree", "Laurel", "Aguacatillo"],
    activities: ["Canopy", "Planting", "Eco-tourism", "Research"],
    impact: "18.3 tons CO₂/year",
    price: 30,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/costa-rica-2400159_1920.jpg-IStszkptDaklXffjPE7uQn9PLtBoeh.jpeg",
    rating: 5.0,
    reviews: 89,
    availability: "Available",
  },
  {
    id: 3,
    name: "Pérez Zeledón Organic Farm",
    location: "Pérez Zeledón, San José",
    owner: "Los Campesinos Cooperative",
    story:
      "This cooperative was born from the dream of 15 farming families who decided to unite to practice regenerative agriculture. 'Before we only thought about producing, now we think about regenerating,' says doña Ana, president of the cooperative. Their agroforestry systems combine organic coffee with native species.",
    mission:
      "Demonstrate that agriculture and conservation can coexist, creating productive systems that regenerate soil and capture carbon.",
    trees: 2100,
    species: ["Organic coffee", "Poró", "Madero negro"],
    activities: ["Organic farming", "Planting", "Lodging", "Workshops"],
    impact: "35.2 tons CO₂/year",
    price: 22,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bird-3331816_1280.jpg-Kf4H8elofLRIEGS64FRN6l0SwonRuQ.jpeg",
    rating: 4.8,
    reviews: 156,
    availability: "Coming soon",
  },
]

interface FarmSelectionProps {
  onSelectFarm: (farm: any) => void
  selectedFarm: any
  onNext: () => void
}

export function FarmSelection({ onSelectFarm, selectedFarm, onNext }: FarmSelectionProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">✅ 1. Select your farm</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our map of regenerative farms and choose the tree you want to adopt. You can filter by species,
          location or type of experience each property offers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
        {farms.map((farm) => (
          <Card
            key={farm.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedFarm?.id === farm.id ? "ring-2 ring-green-500 shadow-xl" : "border-green-200"
            } ${farm.availability === "Coming soon" ? "opacity-75" : ""}`}
            onClick={() => farm.availability === "Available" && onSelectFarm(farm)}
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={farm.image || "/placeholder.svg"}
                  alt={farm.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={farm.availability === "Available" ? "default" : "secondary"}
                    className={
                      farm.availability === "Available"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 text-yellow-900"
                    }
                  >
                    {farm.availability}
                  </Badge>
                </div>
                {selectedFarm?.id === farm.id && (
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{farm.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {farm.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{farm.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">({farm.reviews} reviews)</p>
                </div>
              </div>

              {/* Owner Story */}
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">👨‍🌾 {farm.owner}</h4>
                <p className="text-sm text-green-700 leading-relaxed">{farm.story}</p>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Mission</h4>
                <p className="text-sm text-blue-700 leading-relaxed">{farm.mission}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <TreePine className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{farm.trees} trees</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{farm.activities.length} activities</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🌳 Available species:</h4>
                <div className="flex flex-wrap gap-1">
                  {farm.species.map((species, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {species}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Activities:</h4>
                <div className="flex flex-wrap gap-1">
                  {farm.activities.map((activity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Annual impact</p>
                  <p className="font-semibold text-green-600">{farm.impact}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">From</p>
                  <p className="text-2xl font-bold text-gray-900">{farm.price} XLM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFarm && (
        <div className="text-center">
          <Button size="lg" onClick={onNext} className="bg-green-600 hover:bg-green-700">
            Continue with {selectedFarm.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
