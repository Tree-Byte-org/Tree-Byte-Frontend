import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TreePine, MapPin, Leaf, DollarSign, ArrowRight, Heart, Plus, Minus, Globe, Bird, Users } from "lucide-react"
import Image from "next/image"
import { Farm } from "./types"

interface TreeAdoptionProps {
  farm: Farm | undefined
  onComplete: (complete: boolean) => void
  onNext: () => void
}

type Tree = {
    id: number;
    species: string;
    age: string;
    location: string;
    co2Potential: string;
    price: number;
    image: string;
    characteristics: string[];
    available: number;
    environmentalImpact: {
        soilImprovement: string;
        waterCycle: string;
        airQuality: string;
    };
    biodiversitySupport: {
        wildlife: string;
        pollinators: string;
        ecosystem: string;
    };
    communityBenefits: {
        employment: string;
        education: string;
        economy: string;
    };
}

export function TreeAdoption({ farm, onComplete, onNext }: TreeAdoptionProps) {
  const [selectedTree, setSelectedTree] = useState<Tree>()
  const [quantity, setQuantity] = useState<number>(1)
  const [adopting, setAdopting] = useState<boolean>(false)

  const availableTrees: Tree[] = [
    {
      id: 1,
      species: "Guanacaste",
      age: "Sapling (8 months)",
      location: "Sector A - Plot 15",
      co2Potential: "23.4 tons in 20 years",
      price: 25,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Image-2018-07-24-at-1.29.54-PM.jpeg-qQsxcAELUIh4gFAda5ckOiaMdfiJGQ.webp",
      characteristics: ["National tree", "Extreme longevity", "Wide shade"],
      available: 15,
      environmentalImpact: {
        soilImprovement: "Improves soil structure and prevents erosion",
        waterCycle: "Regulates water cycle and increases local humidity",
        airQuality: "Filters pollutants and produces oxygen for 4 people/day",
      },
      biodiversitySupport: {
        wildlife: "Home to more than 40 species of birds and mammals",
        pollinators: "Attracts native bees and butterflies during flowering",
        ecosystem: "Creates microhabitats for reptiles, amphibians and insects",
      },
      communityBenefits: {
        employment: "Generates local employment for 2 farming families",
        education: "Funds environmental education programs for children",
        economy: "Boosts ecotourism and local organic products",
      },
    },
    {
      id: 2,
      species: "Guarumo",
      age: "Young (2 years)",
      location: "Sector B - Plot 8",
      co2Potential: "18.3 tons in 20 years",
      price: 30,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guarumo-EEk4Lvw0UtImRZgXvYEBxeGnQZwIdT.jpeg",
      characteristics: ["Resistant", "Medicinal", "Large leaves"],
      available: 8,
      environmentalImpact: {
        soilImprovement: "Enriches soil with organic matter from its leaves",
        waterCycle: "Its large leaves capture and direct rainwater",
        airQuality: "Absorbs CO₂ rapidly due to accelerated growth",
      },
      biodiversitySupport: {
        wildlife: "Shelter for sloths, monkeys and tropical birds",
        pollinators: "Flowers attract nocturnal pollinating bats",
        ecosystem: "Pioneer in secondary forest regeneration",
      },
      communityBenefits: {
        employment: "Supports work of traditional medicine collectors",
        education: "Teaches about ancestral medicinal plants",
        economy: "Raw material for crafts and natural medicine",
      },
    },
    {
      id: 3,
      species: "Roble Sabana",
      age: "Sapling (1 year)",
      location: "Sector C - Plot 22",
      co2Potential: "35.2 tons in 20 years",
      price: 35,
      image: "/images/roble-sabana.jpg",
      characteristics: ["Spectacular flowering", "Longevity", "Complex ecosystem"],
      available: 12,
      environmentalImpact: {
        soilImprovement: "Deep roots stabilize slopes and prevent landslides",
        waterCycle: "Intercepts fog and increases water availability",
        airQuality: "Greater CO₂ capture due to its longevity (100+ years)",
      },
      biodiversitySupport: {
        wildlife: "Complete ecosystem for 60+ fauna species",
        pollinators: "Spectacular flowering attracts diverse pollinators",
        ecosystem: "Mother tree that facilitates growth of other species",
      },
      communityBenefits: {
        employment: "Future sustainable forest management for 5 families",
        education: "Tropical silviculture research center",
        economy: "Eco-tourism attraction during flowering season",
      },
    },
  ]

  const handleAdopt = async () => {
    setAdopting(true)
    // Simulate adoption process
    setTimeout(() => {
      onComplete(true)
      setAdopting(false)
      onNext()
    }, 3000)
  }

  const incrementQuantity = () => {
    if (selectedTree && quantity < selectedTree.available) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree)
    setQuantity(1) // Reset quantity when selecting a new tree
  }

  const getTotalPrice = () => {
    return selectedTree ? (selectedTree.price * quantity).toFixed(3) : 0
  }

  const getTotalCO2 = () => {
    if (!selectedTree) return 0
    const co2PerTree = Number.parseFloat(selectedTree.co2Potential.split(" ")[0])
    return (co2PerTree * quantity).toFixed(1)
  }

  if (!farm) return null

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🌱 3. Adopt your tree</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete the adoption process in a couple of clicks. You are financing the real planting or conservation of
          that tree in Costa Rica.
        </p>
      </div>

      {/* Farm Info */}
      <Card className="mb-8 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Image src={farm.image || "/placeholder.svg"} alt={farm.name} className="w-20 h-20 rounded-lg object-cover" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{farm.name}</h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {farm.location}
              </p>
              <p className="text-sm text-green-600 font-medium">Farmer: {farm.owner}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Trees */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableTrees.map((tree) => (
          <Card
            key={tree.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTree?.id === tree.id ? "ring-2 ring-green-500 shadow-xl" : "border-green-200"
            }`}
            onClick={() => handleTreeSelect(tree)}
          >
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={tree.image || "/placeholder.svg"}
                  alt={tree.species}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {selectedTree?.id === tree.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                )}
                {tree.species === "Guanacaste" && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-yellow-900 text-xs">🇨🇷 National Tree</Badge>
                  </div>
                )}
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-white/90 text-gray-800 text-xs">{tree.available} available</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <TreePine className="h-4 w-4 text-green-600 mr-2" />
                {tree.species}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Age:</strong> {tree.age}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {tree.location}
                </p>
                <p className="text-sm text-green-600">
                  <strong>CO₂ Potential:</strong> {tree.co2Potential}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🌿 Characteristics:</h4>
                <div className="flex flex-wrap gap-1">
                  {tree.characteristics.map((char, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-gray-600">Adoption</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{tree.price} XLM</p>
                  <p className="text-xs text-gray-500">per tree</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quantity Selector */}
      {selectedTree && (
        <Card className="border-green-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="h-5 w-5 text-green-600 mr-2" />
              Number of trees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Select quantity</p>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center min-w-[80px]">
                    <p className="text-3xl font-bold text-gray-900">{quantity}</p>
                    <p className="text-sm text-gray-500">{quantity === 1 ? "tree" : "trees"}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    disabled={quantity >= selectedTree.available}
                    className="w-10 h-10 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Maximum: {selectedTree.available} trees available</p>
              </div>

              <div className="text-center border-l pl-6">
                <p className="text-sm text-gray-600 mb-2">Total impact</p>
                <p className="text-2xl font-bold text-green-600">{getTotalCO2()}t</p>
                <p className="text-sm text-gray-500">CO₂ in 20 years</p>
              </div>

              <div className="text-center border-l pl-6">
                <p className="text-sm text-gray-600 mb-2">Total price</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalPrice()} XLM</p>
                <p className="text-sm text-gray-500">
                  {selectedTree.price} XLM × {quantity}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adoption Summary */}
      {selectedTree && (
        <Card className="border-green-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              Adoption summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Your selection:</h4>
                  <div className="space-y-2">
                    <p>
                      <strong>Species:</strong> {selectedTree.species}
                      {selectedTree.species === "Guanacaste" && (
                        <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">
                          National Tree of Costa Rica
                        </Badge>
                      )}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {quantity} {quantity === 1 ? "tree" : "trees"}
                    </p>
                    <p>
                      <strong>Farm:</strong> {farm.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedTree.location}
                    </p>
                    <p>
                      <strong>Farmer:</strong> {farm.owner}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Your investment:</h4>
                  <div className="space-y-2">
                    <p>
                      <strong>Total CO₂ captured:</strong> {getTotalCO2()} tons in 20 years
                    </p>
                    <p>
                      <strong>Contribution:</strong> Conservation and reforestation
                    </p>
                    <p>
                      <strong>Benefits:</strong> {quantity} unique NFT{quantity > 1 ? "s" : ""} + farm visit
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      <strong>Total: {getTotalPrice()} XLM</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Details */}
              <div className="space-y-6">
                {/* Environmental Impact */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Environmental Impact
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>
                      • <strong>Soil:</strong> {selectedTree.environmentalImpact.soilImprovement}
                    </p>
                    <p>
                      • <strong>Water:</strong> {selectedTree.environmentalImpact.waterCycle}
                    </p>
                    <p>
                      • <strong>Air:</strong> {selectedTree.environmentalImpact.airQuality}
                    </p>
                  </div>
                </div>

                {/* Biodiversity Support */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Bird className="h-4 w-4 mr-2" />
                    Biodiversity Support
                  </h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>
                      • <strong>Fauna:</strong> {selectedTree.biodiversitySupport.wildlife}
                    </p>
                    <p>
                      • <strong>Pollinators:</strong> {selectedTree.biodiversitySupport.pollinators}
                    </p>
                    <p>
                      • <strong>Ecosystem:</strong> {selectedTree.biodiversitySupport.ecosystem}
                    </p>
                  </div>
                </div>

                {/* Community Benefits */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Community Benefits
                  </h4>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p>
                      • <strong>Employment:</strong> {selectedTree.communityBenefits.employment}
                    </p>
                    <p>
                      • <strong>Education:</strong> {selectedTree.communityBenefits.education}
                    </p>
                    <p>
                      • <strong>Economy:</strong> {selectedTree.communityBenefits.economy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTree && (
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleAdopt}
            disabled={adopting}
            className="bg-green-600 hover:bg-green-700 px-8 py-4"
          >
            {adopting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing adoption...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Adopt {quantity} {selectedTree.species}
                {quantity > 1 ? "s" : ""} for {getTotalPrice()} XLM
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            By adopting, you are contributing directly to conservation and reforestation in Costa Rica
          </p>
        </div>
      )}
    </div>
  )
}
