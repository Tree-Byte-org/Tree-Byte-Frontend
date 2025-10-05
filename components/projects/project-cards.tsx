"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProjectModal from "./project-modal";
import { useProjects, useProject } from "@/hooks/projects/use-projects";
import { useToggleProjectFavorite, usePrefetchProject } from "@/hooks/projects/use-project-mutations";
import type { EnhancedProject } from "@/services/api/projects-api";

// Loading skeleton component
function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Error component
function ProjectCardsError({ error, refetch }: { error: Error; refetch: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <Alert className="max-w-md">
        <AlertDescription>
          Failed to load projects. Please try again.
        </AlertDescription>
      </Alert>
      <Button onClick={refetch} variant="outline" className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" />
        Retry
      </Button>
    </div>
  );
}

// Individual project card component
function ProjectCard({ 
  project, 
  onCardClick, 
  onFavoriteToggle 
}: { 
  project: EnhancedProject; 
  onCardClick: () => void;
  onFavoriteToggle: () => void;
}) {
  const prefetchProject = usePrefetchProject();

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 group"
      onClick={onCardClick}
      onMouseEnter={() => prefetchProject(project.id)}
    >
      <div className="relative w-full">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.name || project.title || "Project image"}
          width={400}
          height={300}
          className="w-full h-auto object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
        >
          <Heart 
            className={`w-4 h-4 ${project.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-1">
              {project.name || project.title}
            </h3>
            <p className="text-sm text-black dark:text-gray-300">
              {project.location}
            </p>
          </div>
          <div className="text-right">
            <span
              className={`text-sm font-medium ${
                project.status === "active"
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {project.status === "active" ? "Available" : project.status}
            </span>
            <p className="text-sm text-black dark:text-gray-300">
              {project.capacity|| `${project.supply} tokens`}
            </p>
          </div>
        </div>
        {project.impact && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {project.impact}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProjectCards() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects using React Query
  const { 
    data: projects = [], 
    isLoading, 
    error, 
    refetch 
  } = useProjects();

  // Fetch selected project details
  const { data: selectedProject } = useProject(selectedProjectId || '');

  // Mutation for toggling favorites
  const toggleFavorite = useToggleProjectFavorite();

  const handleCardClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleFavoriteToggle = (projectId: string) => {
    toggleFavorite.mutate(projectId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-800 px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="bg-gray-50 dark:bg-gray-800 px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <ProjectCardsError error={error} refetch={refetch} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-800 px-6 py-16 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onCardClick={() => handleCardClick(project.id)}
              onFavoriteToggle={() => handleFavoriteToggle(project.id)}
            />
          ))}
        </div>
        
        {selectedProject && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            project={selectedProject}
          />
        )}
      </div>
    </section>
  );
}
