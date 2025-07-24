import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Costa Rica Forest"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl text-center">
          <div className="flex gap-10">
            <div className="w-2/3 flex flex-col justify-center">
              <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold text-white mb-8 tracking-wider text-justify">
                You could be anywhere in the world and still leave your mark and
                a planted tree in Costa Rica.
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 text-lg rounded-full">
                  Plant a tree
                </Button>
                <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 text-lg rounded-full">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="w-1/3">
              <Image src="/leaf.png" alt="Leaf" width={300} height={300} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
