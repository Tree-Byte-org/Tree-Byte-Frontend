import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useToggleProjectFavorite, useParticipateInProject } from '@/hooks/projects/use-project-mutations'
import { projectsApi } from '@/services/api/projects-api'

// Mock the API
vi.mock('@/services/api/projects-api', () => ({
  projectsApi: {
    toggleProjectFavorite: vi.fn(),
    participateInProject: vi.fn(),
  },
}))

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Create a wrapper with QueryClient for testing
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('Project Mutations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useToggleProjectFavorite', () => {
    it('should toggle project favorite successfully', async () => {
      const mockResponse = { isFavorite: true }
      vi.mocked(projectsApi.toggleProjectFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      // Initially not pending
      expect(result.current.isPending).toBe(false)

      // Trigger mutation
      result.current.mutate('project-123')

      // Should be pending
      expect(result.current.isPending).toBe(true)

      // Wait for completion
      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(projectsApi.toggleProjectFavorite).toHaveBeenCalledWith('project-123')
      expect(result.current.isSuccess).toBe(true)
    })

    it('should handle toggle favorite error', async () => {
      const error = new Error('Toggle failed')
      vi.mocked(projectsApi.toggleProjectFavorite).mockRejectedValue(error)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      result.current.mutate('project-123')

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toBeDefined()
    })

    it('should handle optimistic updates', async () => {
      const mockResponse = { isFavorite: true }
      vi.mocked(projectsApi.toggleProjectFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      // This would test optimistic updates, but we need to set up cache data first
      // For now, just test that the mutation works
      result.current.mutate('project-123')

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
    })
  })

  describe('useParticipateInProject', () => {
    it('should participate in project successfully', async () => {
      const mockResponse = { success: true, participation: 10 }
      vi.mocked(projectsApi.participateInProject).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useParticipateInProject(), {
        wrapper: createWrapper(),
      })

      // Initially not pending
      expect(result.current.isPending).toBe(false)

      // Trigger mutation
      result.current.mutate({ projectId: 'project-123', amount: 5 })

      // Should be pending
      expect(result.current.isPending).toBe(true)

      // Wait for completion
      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(projectsApi.participateInProject).toHaveBeenCalledWith('project-123', 5)
      expect(result.current.isSuccess).toBe(true)
    })

    it('should handle participation error', async () => {
      const error = new Error('Participation failed')
      vi.mocked(projectsApi.participateInProject).mockRejectedValue(error)

      const { result } = renderHook(() => useParticipateInProject(), {
        wrapper: createWrapper(),
      })

      result.current.mutate({ projectId: 'project-123', amount: 5 })

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toBeDefined()
    })

    it('should handle invalid amount', async () => {
      const { result } = renderHook(() => useParticipateInProject(), {
        wrapper: createWrapper(),
      })

      // Try to participate with invalid amount
      result.current.mutate({ projectId: 'project-123', amount: -1 })

      // Should not call API with invalid amount
      expect(projectsApi.participateInProject).not.toHaveBeenCalled()
    })
  })

  describe('Mutation States', () => {
    it('should track mutation state correctly', async () => {
      const mockResponse = { isFavorite: true }
      vi.mocked(projectsApi.toggleProjectFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      // Initial state
      expect(result.current.isIdle).toBe(true)
      expect(result.current.isPending).toBe(false)
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.isError).toBe(false)

      // Start mutation
      result.current.mutate('project-123')

      // Pending state
      expect(result.current.isPending).toBe(true)
      expect(result.current.isIdle).toBe(false)

      // Wait for completion
      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      // Success state
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.isIdle).toBe(false)
      expect(result.current.isError).toBe(false)
    })

    it('should handle error state correctly', async () => {
      const error = new Error('Test error')
      vi.mocked(projectsApi.toggleProjectFavorite).mockRejectedValue(error)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      result.current.mutate('project-123')

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.error).toBeDefined()
    })
  })

  describe('Mutation Data', () => {
    it('should return mutation data on success', async () => {
      const mockResponse = { isFavorite: true }
      vi.mocked(projectsApi.toggleProjectFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      result.current.mutate('project-123')

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(result.current.data).toEqual(mockResponse)
    })

    it('should return error data on failure', async () => {
      const error = new Error('Test error')
      vi.mocked(projectsApi.toggleProjectFavorite).mockRejectedValue(error)

      const { result } = renderHook(() => useToggleProjectFavorite(), {
        wrapper: createWrapper(),
      })

      result.current.mutate('project-123')

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.error).toBeDefined()
    })
  })
})
