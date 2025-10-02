import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProjects, useProject, useFavoriteProjects, useUserProjectParticipation } from '@/hooks/projects/use-projects'
import { projectsApi } from '@/services/api/projects-api'

// Mock the API
vi.mock('@/services/api/projects-api', () => ({
  projectsApi: {
    getProjects: vi.fn(),
    getProject: vi.fn(),
    getFavoriteProjects: vi.fn(),
    getUserProjectParticipation: vi.fn(),
  },
}))

// Create a wrapper with QueryClient for testing
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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

describe('Project Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useProjects', () => {
    it('should fetch projects successfully', async () => {
      const mockProjects = [
        {
          id: '1',
          name: 'Test Project',
          description: 'Test Description',
          location: 'Test Location',
          imageUrl: 'test.jpg',
          impact: 'Test Impact',
          supply: 100,
        },
      ]

      vi.mocked(projectsApi.getProjects).mockResolvedValue(mockProjects)

      const { result } = renderHook(() => useProjects(), {
        wrapper: createWrapper(),
      })

      // Initially loading
      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()

      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockProjects)
      expect(result.current.error).toBeNull()
      expect(projectsApi.getProjects).toHaveBeenCalledWith(undefined)
    })

    it('should fetch projects with filters', async () => {
      const filters = { status: 'active' }
      const mockProjects = []

      vi.mocked(projectsApi.getProjects).mockResolvedValue(mockProjects)

      const { result } = renderHook(() => useProjects(filters), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(projectsApi.getProjects).toHaveBeenCalledWith(filters)
    })

    it('should handle API errors', async () => {
      const error = new Error('API Error')
      vi.mocked(projectsApi.getProjects).mockRejectedValue(error)

      const { result } = renderHook(() => useProjects(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })
  })

  describe('useProject', () => {
    it('should fetch single project successfully', async () => {
      const mockProject = {
        id: '1',
        name: 'Test Project',
        description: 'Test Description',
        location: 'Test Location',
        imageUrl: 'test.jpg',
        impact: 'Test Impact',
        supply: 100,
      }

      vi.mocked(projectsApi.getProject).mockResolvedValue(mockProject)

      const { result } = renderHook(() => useProject('1'), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockProject)
      expect(projectsApi.getProject).toHaveBeenCalledWith('1')
    })

    it('should not fetch when projectId is empty', () => {
      const { result } = renderHook(() => useProject(''), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeUndefined()
      expect(projectsApi.getProject).not.toHaveBeenCalled()
    })
  })

  describe('useFavoriteProjects', () => {
    it('should fetch favorite projects successfully', async () => {
      const mockFavorites = [
        {
          id: '1',
          name: 'Favorite Project',
          isFavorite: true,
        },
      ]

      vi.mocked(projectsApi.getFavoriteProjects).mockResolvedValue(mockFavorites)

      const { result } = renderHook(() => useFavoriteProjects(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockFavorites)
      expect(projectsApi.getFavoriteProjects).toHaveBeenCalled()
    })
  })

  describe('useUserProjectParticipation', () => {
    it('should fetch user participation with userId', async () => {
      const mockParticipation = []
      const userId = 'user-123'

      vi.mocked(projectsApi.getUserProjectParticipation).mockResolvedValue(mockParticipation)

      const { result } = renderHook(() => useUserProjectParticipation(userId), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockParticipation)
      expect(projectsApi.getUserProjectParticipation).toHaveBeenCalledWith(userId)
    })

    it('should not fetch when userId is undefined', () => {
      const { result } = renderHook(() => useUserProjectParticipation(undefined), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeUndefined()
      expect(projectsApi.getUserProjectParticipation).not.toHaveBeenCalled()
    })
  })
})
