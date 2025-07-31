import Image from "next/image";
import Link from "next/link";

export const BusinessPanel = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 my-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-5xl font-bold">Business Panel</h1>

          <div className="flex items-center gap-4">
            <h2 className="font-bold text-3xl">Level:</h2>
            <div className="bg-primary rounded p-4 px-10">
              <p className="text-4xl font-bold">Rooting</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-5">
          <Image
            src="/images/company.png"
            alt="Business Panel"
            width={20}
            height={74}
            className="rounded-lg w-2/5 h-72"
          />

          <Image
            src="/images/graph.png"
            alt="graph"
            width={460}
            height={74}
            className="rounded-lg w-2/5 h-72"
          />

          <Image
            src="/images/achievements.png"
            alt="achievements"
            width={360}
            height={74}
            className="rounded-lg w-1/5 h-72"
          />
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 bg-black dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Your company&apos;s impact
            </h2>

            <div className="grid grid-cols-3 gap-10">
              <Image
                src="/icons/Vector.png"
                alt="company"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <p className="text-5xl font-black text-primary">0.5 t</p>
              <p className="text-lg font-bold text-white">
                Tons of CO2 Captured
              </p>

              <Image
                src="/icons/Vector2.png"
                alt="company"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <p className="text-5xl font-black text-primary">475</p>
              <p className="text-lg font-bold text-white">Trees Planted</p>

              <Image
                src="/icons/Vector3.png"
                alt="company"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <p className="text-5xl font-black text-primary">50ac</p>
              <p className="text-lg font-bold text-white">Acres reforested</p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="col-span-4">
            <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Latest projects accomplished
                </h2>
                <Link
                  href="#"
                  className="text-sm text-gray-600 underline hover:text-gray-800 transition-colors"
                >
                  Show all completed projects...
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/projects/hiking-trail.jpg"
                      alt="Person hiking on forest trail"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="text-gray-800 dark:text-white mb-2 font-bold">
                      Finca Chapinero
                    </h3>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
                    >
                      See project details
                    </Link>
                  </div>
                </div>

                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/projects/jaguar.jpg"
                      alt="Wild cat on tree branch"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="text-gray-800 dark:text-white mb-2 font-bold">
                      Finca Chapinero
                    </h3>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
                    >
                      See project details
                    </Link>
                  </div>
                </div>

                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/projects/waterfall.jpg"
                      alt="Waterfall in jungle"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="text-gray-800 dark:text-white mb-2 font-bold">
                      Finca Chapinero
                    </h3>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
                    >
                      See project details
                    </Link>
                  </div>
                </div>

                <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/projects/sloth.jpg"
                      alt="Colorful macaws on tree"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="text-gray-800 dark:text-white mb-2 font-bold">
                      Finca Chapinero
                    </h3>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
                    >
                      See project details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-primary font-bold py-4 px-8 rounded-full transition-colors duration-200 shadow-lg text-2xl w-full">
                Find new projects
              </button>
            </div>
          </div>
        </div>

        {/* Coupons Section */}
        <div className="col-span-4 mt-5">
          <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Coupons Available
              </h2>
              <Link
                href="#"
                className="text-sm text-gray-600 underline hover:text-gray-800 transition-colors"
              >
                Show all coupons...
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/coupons1.png"
                    alt="Person hiking on forest trail"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/coupons2.png"
                    alt="Wild cat on tree branch"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/coupons3.png"
                    alt="Waterfall in jungle"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/coupons4.png"
                    alt="Colorful macaws on tree"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tokens Section */}
        <div className="col-span-4 mt-5">
          <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Latest Tokens Acquired
              </h2>
              <Link
                href="#"
                className="text-sm text-gray-600 underline hover:text-gray-800 transition-colors"
              >
                Show all tokens...
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex bg-black dark:bg-gray-900 rounded-full p-4 w-32 h-32 items-center justify-center">
                  <Image
                    src="/icons/icon6.png"
                    alt="company"
                    width={100}
                    height={100}
                    className="p-4"
                  />
                </div>
                <p className="text-lg font-bold text-center">CAOBA</p>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex bg-black dark:bg-gray-900 rounded-full p-4 w-32 h-32 items-center justify-center">
                  <Image
                    src="/icons/icon7.png"
                    alt="company"
                    width={100}
                    height={100}
                    className="p-4"
                  />
                </div>
                <p className="text-lg font-bold text-center">ALMENDRO</p>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex bg-black dark:bg-gray-900 rounded-full p-4 w-32 h-32 items-center justify-center">
                  <Image
                    src="/icons/icon8.png"
                    alt="company"
                    width={100}
                    height={100}
                    className="p-4"
                  />
                </div>
                <p className="text-lg font-bold text-center">SAUCE LLORON</p>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex bg-black dark:bg-gray-900 rounded-full p-4 w-32 h-32 items-center justify-center">
                  <Image
                    src="/icons/icon9.png"
                    alt="company"
                    width={100}
                    height={100}
                    className="p-4"
                  />
                </div>
                <p className="text-lg font-bold text-center">CENIZARO</p>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex bg-black dark:bg-gray-900 rounded-full p-4 w-32 h-32 items-center justify-center">
                  <Image
                    src="/icons/icon10.png"
                    alt="company"
                    width={100}
                    height={100}
                    className="p-4"
                  />
                </div>
                <p className="text-lg font-bold text-center">ESPABEL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
