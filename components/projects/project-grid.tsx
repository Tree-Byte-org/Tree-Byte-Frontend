"use client"

import * as React from "react"
import Masonry from "react-masonry-css"
import type { Project } from "@/types/project"
import { ProjectCard } from "./project-card-to-page"

interface ProjectGridProps {
  projects: Project[]
}

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  1024: 2,
  768: 1,
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const heights = ["h-[300px]", "h-[350px]", "h-[400px]", "h-[250px]", "h-[380px]"]

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-6"
      columnClassName="flex flex-col gap-6"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={`${project.id}-${index}`}
          project={project}
          height={heights[index % heights.length]}
        />
      ))}
    </Masonry>
  )
}
