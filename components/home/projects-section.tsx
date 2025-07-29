import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "Verde Turrialba Farm",
      image: "/carousel/1.png",
    },
    {
      id: 2,
      name: "Jojoba Farm",
      image: "/carousel/2.png",
    },
    {
      id: 3,
      name: "Finca el Salto",
      image: "/carousel/4.png",
    },
    {
      id: 4,
      name: "Finca el Salto",
      image: "/carousel/4.png",
    },
    {
      id: 5,
      name: "Finca el Salto",
      image: "/carousel/4.png",
    },
  ];

  return (
    <section className="py-20 dark:bg-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-4">
            Reforestation Projects
          </h2>
          <p className="text-2xl">
            Discover reforestation initiatives active in Costa Rica and select
            the one that inspires you the most. <br /> Transparent, agile, and
            traceable thanks to blockchain technology.
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full relative">
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="relative h-80 w-full rounded-lg overflow-hidden group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg text-center">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
