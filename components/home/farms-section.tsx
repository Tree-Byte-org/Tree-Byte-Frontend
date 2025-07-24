import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Locate, TentTree, Trees } from "lucide-react";

export function FarmsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 bg-[#132109] p-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
            OUR ACTIVE FARMS IN <br /> COSTA RICA
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="relative h-96 bg-green-800 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Costa Rica Map"
                  fill
                  className="object-cover"
                />

                {/* Map markers */}
                <div className="absolute top-1/3 left-1/4">
                  <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-lime-400 rounded-full mx-auto mt-1"></div>
                </div>
                <div className="absolute top-1/2 right-1/3">
                  <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-lime-400 rounded-full mx-auto mt-1"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/2">
                  <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-lime-400 rounded-full mx-auto mt-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center mt-1">
                <span className="text-black text-xs">
                  <Locate className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Finca La Peluca
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Guanacaste, Costa Rica
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <Trees className="w-10 h-10 mr-4" /> 2,500 trees developed
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <TentTree className="w-10 h-10 mr-4" /> Activities
                </div>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 rounded-full">
              Plant a tree here!
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/80 px-8 py-3 rounded-full">
            Show ALL projects
          </Button>
        </div>
      </div>
    </section>
  );
}
