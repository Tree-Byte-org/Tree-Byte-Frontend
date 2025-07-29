"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import ProjectModal from "./project-modal";

interface Project {
  id: number;
  title: string;
  location: string;
  status: "Available" | "Coming soon";
  price: string;
  image: string;
  alt: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/jaguar.jpg",
    alt: "Jaguar in tropical forest",
  },
  {
    id: 2,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/sloth.jpg",
    alt: "Sloth in forest canopy",
  },
  {
    id: 3,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/pastoral-landscape.jpg",
    alt: "Pastoral landscape with trees",
  },
  {
    id: 4,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/hiking-trail.jpg",
    alt: "Person hiking through misty forest",
  },
  {
    id: 5,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/forest-aerial.jpg",
    alt: "Aerial view of forest canopy",
  },
  {
    id: 6,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Available",
    price: "325/750",
    image: "/projects/waterfall.jpg",
    alt: "Waterfall in lush forest",
  },
  {
    id: 7,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Coming soon",
    price: "325/750",
    image: "/projects/misty-forest.jpg",
    alt: "Misty forest landscape",
  },
  {
    id: 8,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Coming soon",
    price: "325/750",
    image: "/projects/tall-forest.jpg",
    alt: "Tall forest with towering trees",
  },
  {
    id: 9,
    title: "Finca Chapinero",
    location: "Turriaba, Cartago",
    status: "Coming soon",
    price: "325/750",
    image: "/projects/sunlight-leaves.jpg",
    alt: "Sunlight filtering through leaves",
  },
];

export default function ProjectCards() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    id: 1,
    title: "Finca Oso Perezoso",
    location: "Turrialba, Cartago",
    rating: 4.9,
    mainImage: "/projects/modal/waterfall-main.jpg",
    thumbnails: [
      "/projects/modal/waterfall-main.jpg",
      "/projects/modal/forest-ferns-1.jpg",
      "/projects/modal/rocks-stream-1.jpg",
      "/projects/modal/forest-ferns-2.jpg",
    ],
    capacity: "800/1500",
    remaining: "700 remaining",
    annualImpact: "21.6 tons CO2/year",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    mission:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    species: ["Peró", "Madero negro", "Guarumo", "Ojoche"],
    activities: ["Bird watching", "Planting", "Hiking", "Rural lodging"],
  };

  const handleCardClick = () => {
    setSelectedProject(modalData);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gray-50 px-6 py-16 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={handleCardClick}
            >
              <div className="relative w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-black mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-black">{project.location}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-medium ${
                        project.status === "Available"
                          ? "text-black"
                          : "text-black"
                      }`}
                    >
                      {project.status}
                    </span>
                    <p className="text-sm text-black">{project.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedProject && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            project={selectedProject}
          />
        )}
      </div>
    </section>
  );
}
