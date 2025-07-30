import Image from "next/image";

export default function ProjectsCard() {
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 ">
      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Projects</h3>

      <div className="space-y-4 mb-6">
        {/* Finca El Guano */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Finca El Guano
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">150/500</span>
          </div>
          <div className="w-full h-32 rounded-lg overflow-hidden">
            <Image
              src="/forest/forest2.webp"
              alt="Finca El Guano - Forest landscape"
              width={300}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Finca Chapinero */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Finca Chapinero
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">325/750</span>
          </div>
          <div className="w-full h-32 rounded-lg overflow-hidden">
            <Image
              src="/forest/forest3.webp"
              alt="Finca Chapinero - Forest trail"
              width={300}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Add more projects button */}
      <div className="text-center">
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium">
          Add more projects
        </button>
      </div>
    </div>
  );
}
