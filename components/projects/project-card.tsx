'use client'

import * as React from 'react'
import Image from 'next/image'
import { HeartIcon, ExternalLinkIcon } from 'lucide-react'
import { ProjectSupplyIndicator } from './project-supply-indicator'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  height?: string
}

export function ProjectCard({ project, height = 'h-[300px]' }: ProjectCardProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${height} bg-black/60`}
    >
      {/* Background Image */}
      <Image
        src={project.imageUrl}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 transition-opacity duration-500" />

      {/* Static Center Title */}
      <div className="absolute inset-0 flex items-center justify-center text-white group-hover:opacity-0 transition-opacity duration-500">
        <h3 className="text-2xl font-bold text-center px-4">{project.name}</h3>
      </div>

      {/* Hover Reveal */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">

        {/* Header */}
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-xl font-semibold leading-tight">{project.name}</h3>
          <div className="text-sm text-white/70 flex flex-col gap-0.5">
            <span><span className="font-medium text-white">Location:</span> {project.location}</span>
            <span><span className="font-medium text-white">Impact:</span> {project.impact}</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm mt-3 text-white/90 border-l-4 border-green-400 pl-3 leading-relaxed italic max-h-[4.5rem] overflow-hidden">
          “{project.description}”
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center gap-4">
            <button className="hover:text-green-400 transition" title="Visit">
              <ExternalLinkIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-pink-400 transition" title="Favorite">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
          <ProjectSupplyIndicator value={project.supply} />
        </div>
      </div>
    </div>
  )
}
