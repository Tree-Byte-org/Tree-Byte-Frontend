"use client"

import * as React from "react"
import type { Project } from "@/types/project"

export function useProjects() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: "1",
          name: "Bosque Verde",
          description: "Reforestation in degraded cattle fields",
          location: "Los Chiles, Alajuela",
          imageUrl: "/forest/forest1.webp",
          impact: "Carbon capture",
          supply: 1500,
        },
        {
          id: "2",
          name: "Reserva La Esperanza",
          description: "Wildlife corridors for endangered species",
          location: "Upala, Alajuela",
          imageUrl: "/forest/forest2.webp",
          impact: "Biodiversity protection",
          supply: 980,
        },
        {
          id: "3",
          name: "Monteverde Eco",
          description: "Native tree planting in mountain slopes",
          location: "Monteverde, Puntarenas",
          imageUrl: "/forest/forest3.webp",
          impact: "Habitat restoration",
          supply: 2250,
        },
        {
          id: "4",
          name: "Bosque Sagrado",
          description: "Dry forest restoration with agroforestry",
          location: "Nicoya, Guanacaste",
          imageUrl: "/forest/forest4.webp",
          impact: "Flora preservation",
          supply: 1200,
        },
        {
          id: "5",
          name: "Selva Viva",
          description: "Buffer zones for indigenous territory",
          location: "Talamanca, Limón",
          imageUrl: "/forest/forest5.webp",
          impact: "Biological corridors",
          supply: 1900,
        },
        {
          id: "6",
          name: "EcoFuturo",
          description: "School and community forest gardens",
          location: "El Guarco, Cartago",
          imageUrl: "/forest/forest6.webp",
          impact: "Environmental education",
          supply: 875,
        },
        {
          id: "7",
          name: "Lomas del Sol",
          description: "Soil regeneration with pioneer species",
          location: "Cañas, Guanacaste",
          imageUrl: "/forest/forest7.webp",
          impact: "Soil regeneration",
          supply: 670,
        },
        {
          id: "8",
          name: "Bosque Aurora",
          description: "Rainforest patch connection project",
          location: "Sarapiquí, Heredia",
          imageUrl: "/forest/forest8.webp",
          impact: "Connectivity",
          supply: 1440,
        },
        {
          id: "9",
          name: "Nueva Vida",
          description: "Native seeds and citizen participation",
          location: "La Unión, Cartago",
          imageUrl: "/forest/forest9.webp",
          impact: "Citizen reforestation",
          supply: 1045,
        },
        {
          id: "10",
          name: "Cerro Verde",
          description: "Mountain cloud forest expansion",
          location: "San Ramón, Alajuela",
          imageUrl: "/forest/forest10.webp",
          impact: "Cloud forest conservation",
          supply: 2120,
        },
        {
          id: "11",
          name: "Finca Orgánica Luz",
          description: "Organic agroforestry demonstration site",
          location: "Perez Zeledón, San José",
          imageUrl: "/forest/forest11.webp",
          impact: "Agroforestry awareness",
          supply: 910,
        },
        {
          id: "12",
          name: "Alianza Verde",
          description: "Regional cooperation for carbon offsets",
          location: "Bagaces, Guanacaste",
          imageUrl: "/forest/forest12.webp",
          impact: "Carbon offset credits",
          supply: 1980,
        },
        {
          id: "13",
          name: "Río Claro Vivo",
          description: "Reforestation along critical river zones",
          location: "Golfito, Puntarenas",
          imageUrl: "/forest/forest13.webp",
          impact: "Water preservation",
          supply: 1340,
        },
        {
          id: "14",
          name: "EcoBalance",
          description: "Mangrove and lowland forest mix",
          location: "Pochote, Puntarenas",
          imageUrl: "/forest/forest14.webp",
          impact: "Coastal resilience",
          supply: 1165,
        },
      ]

      setProjects(mockProjects)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  return {
    projects,
    loading,
    error,
    refetch: () => {},
  }
}
