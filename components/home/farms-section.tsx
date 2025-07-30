import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Locate, TentTree, Trees } from "lucide-react";

export function FarmsSection() {
  return (
    <section className="bg-white dark:bg-black">
      <Image
        src="/images/bg-section.png"
        alt="Farms"
        width={1000}
        height={1000}
        className="w-full h-full object-cover mb-20"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/map.png"
            alt="Farms"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center mt-1">
                <span className="text-black text-xs">
                  <Locate className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Finca La Peluca
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  Turrialba, Cartago
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <Image
                    src="/icons/icon1.png"
                    alt="Tree"
                    width={70}
                    height={70}
                  />{" "}
                  <span className="text-2xl text-primary font-bold">
                    2,500 trees developed
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <Image
                    src="/icons/icon5.png"
                    alt="Tree"
                    width={70}
                    height={70}
                  />{" "}
                  <span className="text-2xl font-bold">Activities</span>
                </div>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/80 text-black font-bold px-8 py-3 rounded-full text-2xl">
              Plant a tree here!
            </Button>
          </div>
        </div>

        <div className="ml-40 mt-12">
          <Button className="bg-primary hover:bg-primary/80 text-black font-bold px-8 py-3 rounded-full text-2xl">
            Show ALL projects
          </Button>
        </div>
      </div>
    </section>
  );
}
