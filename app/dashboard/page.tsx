import AchievementsCard from "@/components/dashboard/achievements-card";
import ActiveProjectsCard from "@/components/dashboard/active-projects-card";
import CouponsSection from "@/components/dashboard/coupons-section";
import FootprintCard from "@/components/dashboard/footprint-card";
import ProjectsCard from "@/components/dashboard/projects-card";
import TokensSection from "@/components/dashboard/tokens-section";

export default function Page() {
  return (
    <div className="mt[7rem] flex flex-col gap-4 max-w-6xl mx-auto bg-white dark:bg-black min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-gray-900 dark:text-white font-medium">
          Hi there Michael,
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-300">
            Points available:
          </span>
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            1569 pts
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-3 gap-4 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-4 h-full">
          <ActiveProjectsCard />
          <FootprintCard />
        </div>

        {/* Middle Column */}
        <div className="h-full">
          <ProjectsCard />
        </div>

        {/* Right Column */}
        <div className="h-full">
          <AchievementsCard />
        </div>
      </div>

      {/* Bottom Section - Coupons */}
      <div className="mt-4">
        <CouponsSection />
      </div>

      {/* Tokens Section */}
      <div className="mt-4">
        <TokensSection />
      </div>
    </div>
  );
}
