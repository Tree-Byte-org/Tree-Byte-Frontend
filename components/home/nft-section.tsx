import Image from "next/image";
import { Button } from "@/components/ui/button";

export function NftSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Image
            src="/nft.png"
            alt="NFT"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />

          <div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary">YOU WILL GET A UNIQUE</span>
              <br />
              TreeByte<span className="text-primary"> NFT.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Each NFT contains verifiable data from your tree: GPS location,
              species, CO₂ captured and updated photos.
            </p>

            <div className="relative bg-gradient-to-r from-gray-900 via-primary to-primary p-6 rounded-lg mb-8">
              <div className="absolute right-0 top-0">
                <Image
                  className="m-4"
                  src="/images/logo-black.png"
                  alt="Tree"
                  width={70}
                  height={70}
                />
              </div>
              <h3 className="text-5xl font-bold text-white mb-2">
                Transform your digital footprint into REAL trees.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
