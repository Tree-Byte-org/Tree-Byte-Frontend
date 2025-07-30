import Image from "next/image";

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="flex gap-4">
            <Image
              src="/images/three.png"
              alt="Quote"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <p className="text-5xl text-gray-600 dark:text-gray-300 mb-4 italic">
              When roots grow deep in purpose,{" "}
              <span className="font-bold">
                {" "}
                even the smallest seed can change the forest.
              </span>
            </p>
          </div>
        </div>

        <h2 className="text-center text-4xl lg:text-6xl font-bold text-primary mb-8">
          HOW IT WORKS?
        </h2>
        <p className="text-center text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-20">
          TreeByte connects you directly with reforestation projects in Costa
          Rica. With TreeByte, every tree you adopt becomes a traceable and
          transparent action that benefits the planet and local communities.
        </p>

        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Step 1 */}
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <div className="flex">
              <Image
                src="/icons/icon1.png"
                alt="Blockchain"
                width={80}
                height={60}
              />

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Choose a project
              </h3>
            </div>

            <p className="text-gray-600  text-sm">
              Explore active reforestation initiatives in Costa Rica, select the
              one that inspires you the most, and discover the type of trees,
              location, and community behind the effort.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <div className="flex">
              <Image
                src="/icons/icon2.png"
                alt="Blockchain"
                width={80}
                height={60}
              />

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Contribute
              </h3>
            </div>

            <p className="text-gray-600  text-sm">
              With a small token contribution, you can adopt trees in this
              project. The entire process is streamlined, transparent, and
              verifiable thanks to blockchain technology.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <div className="flex">
              <Image
                src="/icons/icon3.png"
                alt="Blockchain"
                width={80}
                height={60}
              />

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Receive your NFT
              </h3>
            </div>

            <p className="text-gray-600  text-sm">
              Get a digital receipt of participation, track the progress of your
              trees, and access exclusive benefits within our regenerative
              tourism network.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center justify-center gap-4">
            <div className="flex">
              <Image
                src="/icons/icon4.png"
                alt="Blockchain"
                width={80}
                height={60}
              />

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Tracking and community
              </h3>
            </div>

            <p className="text-gray-600  text-sm">
              Live the full experience by participating in in-person
              reforestation events or visiting partner regenerative farms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
