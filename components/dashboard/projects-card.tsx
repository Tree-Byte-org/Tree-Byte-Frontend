import Image from "next/image";

export default function ProjectsCard() {
  return (
    <div className="h-full bg-white rounded-xl shadow-md border border-gray-200 p-6 ">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">Projects</h3>

      <div className="space-y-4 mb-6">
        {/* Finca El Guano */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 font-medium">
              Finca El Guano
            </span>
            <span className="text-sm font-semibold text-gray-900">150/500</span>
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
            <span className="text-sm text-gray-700 font-medium">
              Finca Chapinero
            </span>
            <span className="text-sm font-semibold text-gray-900">325/750</span>
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
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium">
          Add more projects
        </button>
      </div>
    </div>
  );
}
