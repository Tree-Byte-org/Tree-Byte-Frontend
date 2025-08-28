'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/query-keys'
import { projectsApi } from '@/services/api/projects-api'
import { defaultMutationOptions } from '@/lib/query/query-config'
import { toast } from 'sonner'

/**
 * Hook for toggling project favorite status with optimistic updates
 */
export function useToggleProjectFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectsApi.toggleProjectFavorite,
    ...defaultMutationOptions,
    onMutate: async (projectId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.favorites() })
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.detail(projectId) })

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(queryKeys.projects.favorites())
      const previousProject = queryClient.getQueryData(queryKeys.projects.detail(projectId))

      // Optimistically update the UI
      queryClient.setQueryData(queryKeys.projects.favorites(), (old: any) => {
        if (!old) return old
        return old.map((project: any) =>
          project.id === projectId
            ? { ...project, isFavorite: !project.isFavorite }
            : project
        )
      })

      queryClient.setQueryData(queryKeys.projects.detail(projectId), (old: any) => {
        if (!old) return old
        return { ...old, isFavorite: !old.isFavorite }
      })

      // Return a context object with the snapshotted value
      return { previousFavorites, previousProject }
    },
    onError: (err, projectId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousFavorites) {
        queryClient.setQueryData(queryKeys.projects.favorites(), context.previousFavorites)
      }
      if (context?.previousProject) {
        queryClient.setQueryData(queryKeys.projects.detail(projectId), context.previousProject)
      }
      
      toast.error('Failed to update favorite status')
    },
    onSettled: (data, error, projectId) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.favorites() })
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(projectId) })
      
      if (!error) {
        toast.success(data?.isFavorite ? 'Added to favorites' : 'Removed from favorites')
      }
    },
  })
}

/**
 * Hook for participating in a project with optimistic updates
 */
export function useParticipateInProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, amount }: { projectId: string; amount: number }) =>
      projectsApi.participateInProject(projectId, amount),
    ...defaultMutationOptions,
    onMutate: async ({ projectId, amount }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.detail(projectId) })
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.userParticipation() })

      // Snapshot the previous value
      const previousProject = queryClient.getQueryData(queryKeys.projects.detail(projectId))
      const previousParticipation = queryClient.getQueryData(queryKeys.projects.userParticipation())

      // Optimistically update the UI
      queryClient.setQueryData(queryKeys.projects.detail(projectId), (old: any) => {
        if (!old) return old
        const currentParticipation = old.userParticipation || 0
        return {
          ...old,
          userParticipation: currentParticipation + amount,
          remaining: old.remaining ? String(Math.max(0, parseInt(old.remaining) - amount)) : old.remaining,
        }
      })

      // Return a context object with the snapshotted value
      return { previousProject, previousParticipation }
    },
    onError: (err, { projectId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProject) {
        queryClient.setQueryData(queryKeys.projects.detail(projectId), context.previousProject)
      }
      if (context?.previousParticipation) {
        queryClient.setQueryData(queryKeys.projects.userParticipation(), context.previousParticipation)
      }
      
      toast.error('Failed to participate in project')
    },
    onSuccess: (data, { projectId, amount }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(projectId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.userParticipation() })
      
      toast.success(`Successfully participated with ${amount} tokens!`)
    },
  })
}

/**
 * Hook for prefetching project data on hover
 */
export function usePrefetchProject() {
  const queryClient = useQueryClient()

  return (projectId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.projects.detail(projectId),
      queryFn: () => projectsApi.getProject(projectId),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }
}

/**
 * Hook for invalidating project cache
 */
export function useInvalidateProjects() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
    },
    invalidateList: (filters?: any) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.list(filters) })
    },
    invalidateDetail: (projectId: string) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(projectId) })
    },
    invalidateFavorites: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.favorites() })
    },
    invalidateParticipation: (userId?: string) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.userParticipation(userId) })
    },
  }
}

/**
 * Hook for managing project cache
 */
export function useProjectCache() {
  const queryClient = useQueryClient()

  return {
    // Get cached data
    getProject: (projectId: string) => 
      queryClient.getQueryData(queryKeys.projects.detail(projectId)),
    getProjects: (filters?: any) => 
      queryClient.getQueryData(queryKeys.projects.list(filters)),
    getFavorites: () => 
      queryClient.getQueryData(queryKeys.projects.favorites()),
    
    // Set cached data
    setProject: (projectId: string, data: any) => 
      queryClient.setQueryData(queryKeys.projects.detail(projectId), data),
    setProjects: (filters: any, data: any) => 
      queryClient.setQueryData(queryKeys.projects.list(filters), data),
    setFavorites: (data: any) => 
      queryClient.setQueryData(queryKeys.projects.favorites(), data),
    
    // Remove cached data
    removeProject: (projectId: string) => 
      queryClient.removeQueries({ queryKey: queryKeys.projects.detail(projectId) }),
    removeProjects: (filters?: any) => 
      queryClient.removeQueries({ queryKey: queryKeys.projects.list(filters) }),
    removeFavorites: () => 
      queryClient.removeQueries({ queryKey: queryKeys.projects.favorites() }),
  }
}
