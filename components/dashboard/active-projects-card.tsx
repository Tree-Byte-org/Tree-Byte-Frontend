import Image from "next/image";

export default function ActiveProjectsCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex gap-4 h-fit">
      {/* Left side - Forest illustration */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden">
          <Image
            src="/forest-hikers.jpg"
            alt="Two hikers walking through a forest"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right side - Number and content stacked */}
      <div className="flex flex-col justify-start">
        <div className="text-4xl font-bold text-green-500 leading-none">2</div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mt-1">
          Active Projects
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1 max-w-xs">
          We are grateful with you all your support with text to user and all
          his he does, etc...
        </p>
      </div>
    </div>
  );
}
