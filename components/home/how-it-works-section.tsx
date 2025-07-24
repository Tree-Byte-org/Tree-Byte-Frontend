export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 italic">
            "When roots grow deep in purpose, even the smallest seed can change
            the forest."
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-lime-400 mb-8">
            HOW IT WORKS?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            TreeByte connects you directly with reforestation projects in Costa
            Rica. With TreeByte, every tree you adopt becomes a traceable and
            transparent action that benefits the planet and local communities.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-lime-400 text-black p-8 rounded-lg mb-6 relative">
              <div className="text-6xl font-bold mb-4">1</div>
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold">Choose a project</h3>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-lime-400 rounded-full mb-4 mx-auto">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
              Adopt a tree
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              You will receive a digital certificate that proves your
              contribution to reforestation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-lime-400 rounded-full mb-4 mx-auto">
              <span className="text-2xl">👁️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
              Monitor its growth
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Track the progress of your tree through our transparent monitoring
              system.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-lime-400 rounded-full mb-4 mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
              Tracking and verification
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Blockchain technology ensures complete transparency and
              traceability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
