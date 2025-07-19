"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/project-card";
import AdoptTreeModal from "@/components/adopt-tree/adopt-tree-modal";

type Project = {
  id: string;
  name: string;
  photo_url?: string;
  impact?: string;
  price_per_token?: number;
};

export default function ProjectList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project: Project = {
    id: "b2fa3b07-c21f-40de-b753-60cbb3ff1b7b",
    name: "Test Project",
    photo_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Image-2018-07-24-at-1.29.54-PM.jpeg-tExYHZlWL4OjwG2mS8mxKuN1uRMvVS.webp",
    impact: "Reforestation in Costa Rica",
    price_per_token: 5, 
  };

  const handleAdopt = (id: string) => {
    setSelectedProject(id);
    setIsOpen(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <ProjectCard project={project} onAdopt={handleAdopt} />

      {selectedProject && (
        <AdoptTreeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          projectId={selectedProject}
        />
      )}
    </div>
  );
}
