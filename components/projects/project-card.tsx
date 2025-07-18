"use client"

import * as React from "react"
import Image from "next/image"
import type { Project } from "@/types/project"
import { ProjectSupplyIndicator } from "./project-supply-indicator"

interface ProjectCardProps {
  project: Project
  height?: string
}

export function ProjectCard({ project, height = "h-[300px]" }: ProjectCardProps) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group cursor-pointer ${height}`}>
      <Image
        src={project.imageUrl}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-2 transition-transform duration-500 group-hover:-translate-y-1">
          {project.name}
        </h3>
        <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 max-w-md">
          {project.impact}
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
          <ProjectSupplyIndicator value={project.supply} delay={200} />
        </div>
      </div>
    </div>
  )
}
