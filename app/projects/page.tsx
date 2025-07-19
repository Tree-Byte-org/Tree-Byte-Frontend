'use client'

import * as React from "react"
import { useProjects } from "@/hooks/projects/use-projects"
import { ProjectGrid } from "@/components/projects/project-grid"
import { AnimatedSection } from "@/components/animated-section"

export default function ProjectsPage() {
  const { projects, loading, error, refetch } = useProjects()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection animation="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Reforestation Projects
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            Discover real-world environmental initiatives led by local farms. Browse through our
            available reforestation projects and support the regeneration of our planet.
          </p>
        </AnimatedSection>

        {loading && (
          <div className="h-[80vh] flex items-center justify-center text-gray-500">
            Loading projects...
          </div>
        )}

        {error && (
          <div className="h-[80vh] flex flex-col items-center justify-center text-red-600 gap-4">
            <p>There was an error loading the projects.</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="h-[80vh] flex items-center justify-center text-gray-600">
            No projects available at the moment.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </div>
  )
}
