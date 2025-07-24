import Image from "next/image";
import { Button } from "@/components/ui/button";

export function NftSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary">YOU WILL GET A UNIQUE</span>
              <br />
              TreeByte<span className="text-primary"> NFT.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Each NFT contains verifiable data from your tree: GPS location,
              species, CO₂ captured and updated photos.
            </p>

            <div className="bg-gradient-to-r from-gray-900 via-primary to-primary p-6 rounded-lg mb-8">
              <h3 className="text-4xl font-bold text-white mb-2">
                Transform your{" "}
                <Image src="/favicon.ico" alt="Tree" width={20} height={20} />{" "}
                digital footprint into REAL trees.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
