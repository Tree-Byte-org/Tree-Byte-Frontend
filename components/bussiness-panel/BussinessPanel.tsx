import { Award, Leaf, Mountain, Plus, Star, TreePine } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

export const BussinessPanel = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 mb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Panel</h1>
          <Badge className="bg-primary px-4 py-2 text-sm font-medium">
            Level: Rooting
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">MAKIX</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">8</span>
                    </div>
                    <span className="font-semibold">Active Projects</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We are grateful with you and your support for the
                    environment, all has he does, etc...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Company Impact */}
            <Card className="bg-tertiary text-white">
              <CardHeader>
                <CardTitle className="text-lg">Your company's impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      0.5 t
                    </div>
                    <div className="text-sm text-gray-300">
                      Tons of CO2 Captured
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TreePine className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-400">475</div>
                    <div className="text-sm text-gray-300">Trees Planted</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      50ac
                    </div>
                    <div className="text-sm text-gray-300">
                      Acres reforested
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Year Overview Chart */}
            <Image
              src="/placeholder.svg?height=100&width=600"
              alt="Year overview chart"
              width={600}
              height={100}
              className="object-cover w-full h-40 mb-10"
            />

            {/* Latest Projects */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Latest projects accomplished
                </h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Show all completed projects...
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={`/placeholder.svg?height=150&width=150&query=nature forest project ${i}`}
                        alt={`Project ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-600">Finca Changuinola</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600 py-3 text-lg font-medium">
              Find new projects
            </Button>

            {/* Coupons */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Coupons Available</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Show all coupons...
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { discount: "15%", place: "Hotel Flamingo" },
                  { discount: "28%", place: "Cabinas Don Sami" },
                  { discount: "15%", place: "Natura Lodge" },
                  { discount: "25%", place: "Hotel Chirripó" },
                ].map((coupon, i) => (
                  <Card key={i} className="overflow-hidden relative">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={`/placeholder.svg?height=120&width=160&query=${coupon.place} hotel nature`}
                        alt={coupon.place}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {coupon.discount} OFF
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Leaf className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs text-gray-600">{coupon.place}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Latest Tokens */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Latest tokens acquired
                </h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Show all tokens...
                </button>
              </div>
              <div className="flex justify-between gap-4">
                {[
                  { name: "CAOBA", icon: TreePine },
                  { name: "ALMENDRO", icon: TreePine },
                  { name: "SAUCE LLORÓN", icon: TreePine },
                  { name: "CENÍZARO", icon: TreePine },
                  { name: "ESPABEL", icon: TreePine },
                ].map((token, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-tertiary rounded-full flex items-center justify-center mb-2">
                      <token.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {token.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Latest Achievements</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center"
                  >
                    {i <= 6 ? (
                      <Award className="w-6 h-6 text-green-400" />
                    ) : (
                      <Star className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
