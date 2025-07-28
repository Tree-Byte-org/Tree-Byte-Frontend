import { Shield, Sparkles, PieChart } from "lucide-react";

export default function AchievementsCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-fit">
      <h3 className="font-semibold text-gray-900 text-lg mb-6">
        Latest Achievements
      </h3>

      <div className="space-y-6 mb-6">
        {/* We Protect Achievement */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-3">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
            WE PROTECT
          </span>
        </div>

        {/* Grow Your Roots Achievement */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8 text-green-400" />
          </div>
          <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
            GROW YOUR ROOTS
          </span>
        </div>

        {/* Your First Batch Achievement */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-3">
            <PieChart className="w-8 h-8 text-green-400" />
          </div>
          <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
            YOUR FIRST BATCH
          </span>
        </div>
      </div>

      {/* Open all achievements button */}
      <div className="text-center">
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium">
          Open all achievements
        </button>
      </div>
    </div>
  );
}
