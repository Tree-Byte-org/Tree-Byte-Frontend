import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Download,
  Share2,
  ArrowRight,
  MapPin,
  Calendar,
  Leaf,
} from "lucide-react";
import Image from "next/image";

interface NFTPreviewProps {
  farm: any;
  onNext: () => void;
}

export function NFTPreview({ farm, onNext }: NFTPreviewProps) {
  const nftData = {
    tokenId: "#TB001234",
    species: "Guanacaste",
    plantedDate: "January 15, 2024",
    location: "9.8765°N, 83.9130°W",
    co2Captured: "0.8 tons",
    estimatedGrowth: "23.4 tons in 20 years",
    farmName: farm?.name || "Verde Turrialba Farm",
    owner: farm?.owner || "Don Carlos Méndez",
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎁 4. Receive your NFT
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Once the adoption is confirmed, you will receive a unique NFT that
          represents your tree: includes species, GPS location, planting date,
          photo and estimated CO₂ captured.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Visual */}
        <div className="text-center">
          <div className="relative inline-block">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2018%20may%202025%2C%2008_57_44%20a.m.-iQiCUlagUoq0xz0w18ULBvAYU8wYYo.png"
              alt="Your TreeByte NFT - Guanacaste"
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              New!
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {nftData.tokenId}
            </Badge>
            <p className="text-gray-600">Your unique digital certificate</p>
            <Badge className="bg-yellow-100 text-yellow-800">
              🇨🇷 National Tree of Costa Rica
            </Badge>
          </div>
        </div>

        {/* NFT Details */}
        <div className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 text-green-600 mr-2" />
                Your NFT details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Species</p>
                  <p className="font-semibold">{nftData.species}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Token ID</p>
                  <p className="font-semibold">{nftData.tokenId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Planting date</p>
                    <p className="font-semibold">{nftData.plantedDate}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">GPS location</p>
                    <p className="font-semibold">{nftData.location}</p>
                    <p className="text-xs text-gray-500">{nftData.farmName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Leaf className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">CO₂ captured so far</p>
                    <p className="font-semibold text-green-600">
                      {nftData.co2Captured}
                    </p>
                    <p className="text-xs text-gray-500">
                      Estimated: {nftData.estimatedGrowth}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-800 mb-3">
                🌟 Your NFT benefits:
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Verifiable ownership certificate on Stellar
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Automatic growth updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Access to exclusive farm visits
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Participation in TreeByte community
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Annual environmental impact report
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Button
            size="lg"
            onClick={onNext}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            View my impact dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
