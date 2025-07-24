import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What is{" "}
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/favicon.ico"
                  alt="TreeByte"
                  width={30}
                  height={30}
                />
                TreeByte
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              TreeByte is a blockchain-powered platform for real-world
              reforestation. By adopting a tree, you receive a digital proof of
              impact and gain access to a network of regenerative tourism
              experiences across Costa Rica. Each contribution is fully
              traceable, transparent, and helps restore biodiversity one project
              at a time.
            </p>
            <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 rounded-full">
              Want to know more?
            </Button>
          </div>

          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Costa Rica Forest"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <Image src="/icons/1.png" alt="Blockchain" width={70} height={70} />

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Blockchain + Reforestation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Decentralized technology serving the environment
            </p>
          </div>

          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <Image src="/icons/2.png" alt="NFTs" width={70} height={70} />

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              NFTs with real impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Each token represents a real trees with verifiable data
            </p>
          </div>

          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <Image
              src="/icons/3.png"
              alt="Regenerative tourism"
              width={70}
              height={70}
            />

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Regenerative tourism in Costa Rica
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We make reforestation and eco-friendly tourism work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
