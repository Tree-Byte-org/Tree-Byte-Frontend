'use client'

import { useQuery } from '@tanstack/react-query'
import type { Project } from '@/types/project'
import type { ProjectFilters } from '@/lib/query/query-keys'
import { queryKeys } from '@/lib/query/query-keys'
import { projectsApi, type EnhancedProject } from '@/services/api/projects-api'
import { projectQueryOptions } from '@/lib/query/query-config'

/**
 * Hook for fetching projects with React Query
 * Provides caching, background updates, and error handling
 */
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: queryKeys.projects.list(filters),
    queryFn: () => projectsApi.getProjects(filters),
    ...projectQueryOptions,
  })
}

/**
 * Hook for fetching a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id, // Only run query if id is provided
    ...projectQueryOptions,
  })
}

/**
 * Hook for fetching user's favorite projects
 */
export function useFavoriteProjects() {
  return useQuery({
    queryKey: queryKeys.projects.favorites(),
    queryFn: () => projectsApi.getFavoriteProjects(),
    ...projectQueryOptions,
  })
}

/**
 * Hook for fetching user participation in projects
 */
export function useUserProjectParticipation(userId?: string) {
  return useQuery({
    queryKey: queryKeys.projects.userParticipation(userId),
    queryFn: () => projectsApi.getUserProjectParticipation(userId),
    enabled: !!userId, // Only run query if userId is provided
    ...projectQueryOptions,
  })
}

// Legacy hook for backward compatibility
// This maintains the same interface as the original hook
export function useProjectsLegacy() {
  const { data: projects, isLoading: loading, error } = useProjects()
  
  return {
    projects: projects || [],
    loading,
    error,
    refetch: () => {}, // This will be handled by React Query automatically
  }
}

