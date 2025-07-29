export default function ProjectsHeader() {
  return (
    <section className="bg-black px-6 py-12 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our Projects
            </h1>
          </div>
          <div className="md:col-span-2">
            <p className="text-[#7EF45D] text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
