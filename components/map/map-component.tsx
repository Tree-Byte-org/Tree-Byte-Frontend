"use client";

import { MapPin, TreePalm, TentTree } from "lucide-react";

export default function ProjectMapSection() {
  return (
    <section className="bg-[url('/map/background.jpg')] bg-cover bg-center px-6 py-16">
      <div className="flex flex-col items-center gap-6">
        {/* Mapa + Info Panel wrapper */}
        <div className="flex items-start gap-4">
          {/* Mapa y botón centrado debajo */}
          <div className="flex flex-col items-center">
            {/* Mapa */}
            <div className="border border-white rounded-lg overflow-hidden">
              <img
                src="/map/map-region.png"
                alt="Project Map"
                className="w-full max-w-md object-cover"
              />
            </div>

            {/* Show ALL Projects debajo del mapa */}
            <button className="mt-6 bg-[#90f46f] text-black font-medium px-6 py-2 rounded-full hover:bg-[#77dd55] transition">
              Show ALL projects
            </button>
          </div>

          {/* Info Panel */}
          <div className="text-white w-64 space-y-6">
            {/* Title and location */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full bg-[#90f46f] mt-1" />
              <div>
                <h2 className="text-lg font-bold">Finca La Peluca</h2>
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Turrialba, Cartago
                </p>
              </div>
            </div>

            {/* Tree availability */}
            <div className="flex items-center gap-2">
              <TreePalm className="w-5 h-5 text-[#90f46f]" />
              <span className="text-[#90f46f] font-semibold text-sm">
                1250 Trees Available
              </span>
            </div>

            {/* Activities */}
            <div>
              <p className="font-semibold mb-2 flex items-center gap-2">
                <TentTree className="w-4 h-4" />
                Activities:
              </p>
              <ul className="flex flex-col gap-1 underline text-sm text-[#90f46f]">
                <li>
                  <a href="#">Planting</a>
                </li>
                <li>
                  <a href="#">Hiking</a>
                </li>
                <li>
                  <a href="#">Bird Watching</a>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <button className="bg-[#90f46f] text-black font-medium px-6 py-2 rounded-full hover:bg-[#77dd55] transition">
              Plant a tree here!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
