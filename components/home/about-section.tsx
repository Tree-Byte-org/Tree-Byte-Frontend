import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center my-40">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              What is{" "}
              <span className="inline-flex items-center mx-4 ">
                <Image
                  src="/images/logo-black.png"
                  alt="TreeByte"
                  width={70}
                  height={70}
                />
              </span>
              <span className="text-primary">TreeByte</span> ?
            </h2>
            <p className="text-4xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              TreeByte is a blockchain-powered platform for real-world
              reforestation. By adopting a tree, you receive a digital proof of
              impact and gain access to a network of regenerative tourism
              experiences across Costa Rica. Each contribution is fully
              traceable, transparent, and helps restore biodiversity one project
              at a time.
            </p>
            <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 rounded-full w-4/5 mx-auto">
              Want to know more?
            </Button>
          </div>

          <div className="relative lg:absolute lg:right-0 lg:top-960 w-full lg:w-[550px] h-[752px] mb-20">
            <Image
              src="/images/jaguar.png"
              alt="Costa Rica Forest"
              width={1000}
              height={1000}
              className="object-cover w-full h-full rounded-lg lg:rounded-l-lg lg:rounded-r-none"
            />

            <div className="w-[550px] h-[752px] absolute pointer-events-none z-20 top-5 left-10">
              <Image
                src="/images/rectagle.png"
                alt="Overlay rectangle"
                width={510}
                height={520}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <Image src="/icons/1.png" alt="Blockchain" width={70} height={70} />

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Blockchain + Reforestation
            </h3>
            <p className="text-gray-600  text-sm">
              Decentralized technology serving the environment
            </p>
          </div>

          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <Image src="/icons/2.png" alt="NFTs" width={70} height={70} />

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              NFTs with real impact
            </h3>
            <p className="text-gray-600 text-sm">
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

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Regenerative tourism in Costa Rica
            </h3>
            <p className="text-gray-600 text-sm">
              We make reforestation and eco-friendly tourism work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
