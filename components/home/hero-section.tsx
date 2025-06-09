import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TreePine, MapPin, Leaf } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('/images/hero-background.png')`,
        }}
      />

      {/* Enhanced gradient overlay at bottom for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent"></div>

      {/* Floating elements - hidden on mobile for cleaner look */}
      <div className="absolute inset-0 opacity-30 hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-green-200 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 text-center text-white relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight opacity-0 animate-[fade-in_1s_ease-out_0.3s_forwards]">
            Transform your digital footprint into{" "}
            <span className="text-green-300 animate-text-pulse block sm:inline">real trees</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-green-100 max-w-4xl mx-auto leading-relaxed opacity-0 animate-[fade-in_1s_ease-out_0.6s_forwards]">
            With Tree Byte, every click counts. Adopt a tree, get a unique NFT, and visit your impact on a real farm in
            Costa Rica.
          </p>

          {/* CTA Buttons - Fixed to be horizontal on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 opacity-0 animate-[fade-in_1s_ease-out_0.9s_forwards]">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-base sm:text-lg rounded-xl w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-2xl"
              asChild
            >
              <a href="/adopt-flow">
                Adopt your tree
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 text-base sm:text-lg rounded-xl w-full sm:w-auto transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Discover how it works
            </Button>
          </div>

          {/* Key features */}
          <div className="opacity-0 animate-[fade-in_1s_ease-out_1.2s_forwards]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-400/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <TreePine className="h-6 w-6 sm:h-8 sm:w-8 text-green-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-200">Real Trees</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Every NFT represents an actual tree planted in Costa Rica
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-400/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-emerald-200">GPS Verified</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Track your tree's exact location and growth progress
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-400/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-200">Visit & Experience</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  Plan regenerative trips to see your trees in person
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-bold text-green-300">1,250+</div>
                <div className="text-green-100 text-xs sm:text-sm">Trees Available</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300">3</div>
                <div className="text-green-100 text-xs sm:text-sm">Active Farms</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-bold text-green-300">🇨🇷</div>
                <div className="text-green-100 text-xs sm:text-sm">Costa Rica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
