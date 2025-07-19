import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TreePine,
  MapPin,
  Calendar,
  Users,
  Camera,
  Plane,
  Home,
} from "lucide-react";

interface ImpactDashboardProps {
  farm: any;
}

export function ImpactDashboard({ farm }: ImpactDashboardProps) {
  const impactData = {
    totalTrees: 1,
    co2Captured: "0.8 tons",
    co2Potential: "23.4 tons",
    daysOwned: 15,
    nextUpdate: "In 30 days",
    visitScheduled: false,
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          📍 5. Track your impact
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From your personal dashboard you can see your forest growth, learn
          about new updates, schedule a farm visit and share your impact with
          the world.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Impact Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {impactData.totalTrees}
              </p>
              <p className="text-sm text-gray-600">Tree adopted</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {impactData.co2Captured}
              </p>
              <p className="text-sm text-gray-600">CO₂ captured</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {impactData.daysOwned}
              </p>
              <p className="text-sm text-gray-600">Days as guardian</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">TreeByte community</p>
            </CardContent>
          </Card>
        </div>

        {/* Tree Details */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="h-5 w-5 text-green-600 mr-2" />
              Your Guanacaste tree
              <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                🇨🇷 National Tree
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2018%20may%202025%2C%2008_57_44%20a.m.-iQiCUlagUoq0xz0w18ULBvAYU8wYYo.png"
                  alt="Your Guanacaste tree"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">Last photo: 5 days ago</Badge>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    View gallery
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    📊 Growth progress
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Estimated height</span>
                        <span>2.8m / 30m</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "9%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CO₂ captured</span>
                        <span>0.8t / 23.4t</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "3%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    📍 Location
                  </h4>
                  <div className="space-y-2">
                    <p className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-green-600 mr-2" />
                      {farm?.name || "Verde Turrialba Farm"}
                    </p>
                    <p className="text-sm text-gray-600">Sector A - Plot 15</p>
                    <p className="text-sm text-gray-600">9.8765°N, 83.9130°W</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    🔄 Next update
                  </h4>
                  <p className="text-sm text-gray-600">
                    {impactData.nextUpdate}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You will receive new photos and updated metrics
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Plane className="h-5 w-5 mr-2" />
                Plan your visit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Visit your tree in person and experience the complete
                regenerative experience at {farm?.name || "the farm"}.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-blue-600">
                  ✈️ Includes transport from San José
                </p>
                <p className="text-sm text-blue-600">
                  🏠 Farm lodging (optional)
                </p>
                <p className="text-sm text-blue-600">
                  🌱 Additional planting activity
                </p>
                <p className="text-sm text-blue-600">🍽️ Local organic food</p>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plane className="mr-2 h-4 w-4" />
                Schedule visit
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-2" />
                TreeByte Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Connect with other tree guardians, share your progress and
                participate in exclusive events.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  💬 Chat with other adopters
                </p>
                <p className="text-sm text-gray-600">📸 Community gallery</p>
                <p className="text-sm text-gray-600">🎉 Events and webinars</p>
                <p className="text-sm text-gray-600">🏆 Impact challenges</p>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Join the community
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Return Home */}
        <div className="text-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to home
            </a>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Thank you for being part of the TreeByte regenerative movement! 🌱
          </p>
        </div>
      </div>
    </div>
  );
}
