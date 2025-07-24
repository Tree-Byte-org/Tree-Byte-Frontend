import Image from "next/image";

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "Finca El Silencio",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      name: "Monteverde",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      name: "Manuel Antonio",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      name: "Talamanca",
      image: "/placeholder.svg?height=400&width=300",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Reforestation Projects
          </h2>
          Discover reforestation initiatives active in Costa Rica and select the
          one that inspires you the most. <br /> Transparent, agile, and
          traceable thanks to blockchain technology.
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {project.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
