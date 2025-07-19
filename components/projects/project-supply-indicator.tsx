'use client'

import * as React from 'react'

interface ProjectSupplyIndicatorProps {
  value: number
  delay?: number
}

export function ProjectSupplyIndicator({ value, delay = 0 }: ProjectSupplyIndicatorProps) {
  return (
    <div className="w-full px-2">
      <div className="relative overflow-hidden rounded-xl">
        {/* Overlay de texto encima del scroll */}

      </div>
    </div>
  )
}
