import { Cloud, Sprout, Mountain } from "lucide-react";

export default function FootprintCard() {
  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-6 h-fit">
      <h3 className="text-white font-semibold text-lg mb-6">Your Footprint</h3>

      <div className="space-y-6">
        {/* CO2 Captured */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-400/20 rounded-full">
            <Cloud className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-green-400 font-bold text-xl">0.5 t</span>
            <span className="text-gray-300 text-sm">Tons of CO2 Captured</span>
          </div>
        </div>

        {/* Trees Planted */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-400/20 rounded-full">
            <Sprout className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-green-400 font-bold text-xl">475</span>
            <span className="text-gray-300 text-sm">Trees Planted</span>
          </div>
        </div>

        {/* Acres Reforested */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-400/20 rounded-full">
            <Mountain className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-green-400 font-bold text-xl">50ac</span>
            <span className="text-gray-300 text-sm">Acres reforested</span>
          </div>
        </div>
      </div>
    </div>
  );
}
