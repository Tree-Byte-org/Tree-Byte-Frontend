import { AnimatedSection } from "@/components/animated-section";

export function EcosystemPillars() {
  return (
    <AnimatedSection id="ecosystem-pillars" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The 4 pillars of the TreeByte ecosystem
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A complete ecosystem that connects technology, conservation and
                real experiences
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column */}
            <div className="md:w-1/2 flex flex-col gap-6">
              {/* Top left tall card */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[400px] md:h-[500px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nft-with-real-tree-vL6GYWBdvF333Q3sQqDINerImbQfhQ.png"
                  alt="NFT WITH REAL TREE"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 transform transition-transform duration-500 group-hover:-translate-y-4">
                    NFT WITH REAL TREE
                  </h3>
                  <p className="text-base md:text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 max-w-md">
                    Adopt trees represented by unique, traceable and living NFTs
                    on blockchain.
                  </p>
                </div>
              </div>

              {/* Bottom left card */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[250px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conservation-tokenization-g5ocRb1Q1nIdwVzTvQTeJC30Q9M813.png"
                  alt="CONSERVATION TOKENIZATION"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    CONSERVATION TOKENIZATION
                  </h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    Farms can tokenize existing trees, divide land or sell
                    regenerative activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:w-1/2 flex flex-col gap-6">
              {/* Top right card */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[250px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/regenarative-tourism-9KhyfU0MFAahM3yigiLbvAJhbCkHW7.png"
                  alt="REGENERATIVE TOURISM"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    REGENERATIVE TOURISM
                  </h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    Visit the farm, plant trees, stay and live the experience.
                  </p>
                </div>
              </div>

              {/* Bottom right tall card */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[400px] md:h-[500px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/green-loyalty-card-122uO8vkoV6UDG4Eif8liUAbG9qFdb.png"
                  alt="GREEN LOYALTY"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    GREEN LOYALTY
                  </h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    Accumulate green points with purchases, exchange them for
                    trees, discounts or experience NFTs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-8">
                Each pillar works together to create a comprehensive platform
                for environmental impact
              </p>
              <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300">
                Explore our ecosystem
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
}
