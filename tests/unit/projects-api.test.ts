import { describe, it, expect, vi, beforeEach } from 'vitest'
import { projectsApi, ApiError } from '@/services/api/projects-api'
import type { ProjectFilters } from '@/lib/query/query-keys'

// Mock fetch globally
global.fetch = vi.fn()

describe('Projects API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProjects', () => {
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

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      })

      const result = await projectsApi.getProjects()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockProjects)
    })

    it('should fetch projects with filters', async () => {
      const filters: ProjectFilters = { status: 'active', location: 'Costa Rica' }
      const mockProjects = []

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      })

      await projectsApi.getProjects(filters)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects?status=active&location=Costa+Rica',
        expect.any(Object)
      )
    })

    it('should handle API errors', async () => {
      ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Internal Server Error' }),
      })

      await expect(projectsApi.getProjects()).rejects.toThrow(ApiError)
      await expect(projectsApi.getProjects()).rejects.toMatchObject({
        message: 'Internal Server Error',
        status: 500,
      })
    })

    it('should handle network errors', async () => {
      ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

      await expect(projectsApi.getProjects()).rejects.toThrow(ApiError)
      await expect(projectsApi.getProjects()).rejects.toMatchObject({
        message: 'Failed to fetch projects',
        status: 500,
        code: 'FETCH_ERROR',
      })
    })
  })

  describe('getProject', () => {
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

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProject,
      })

      const result = await projectsApi.getProject('1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/1',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockProject)
    })

    it('should handle project not found', async () => {
      ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Project not found' }),
      })

      await expect(projectsApi.getProject('999')).rejects.toThrow(ApiError)
      await expect(projectsApi.getProject('999')).rejects.toMatchObject({
        status: 404,
      })
    })
  })

  describe('getFavoriteProjects', () => {
    it('should fetch favorite projects successfully', async () => {
      const mockFavorites = []

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFavorites,
      })

      const result = await projectsApi.getFavoriteProjects()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/favorites',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockFavorites)
    })
  })

  describe('toggleProjectFavorite', () => {
    it('should toggle project favorite successfully', async () => {
      const mockResponse = { isFavorite: true }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await projectsApi.toggleProjectFavorite('1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/1/favorite',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getUserProjectParticipation', () => {
    it('should fetch user participation with userId', async () => {
      const mockParticipation = []

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockParticipation,
      })

      await projectsApi.getUserProjectParticipation('user-123')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/participation/user-123',
        expect.any(Object)
      )
    })

    it('should fetch user participation without userId', async () => {
      const mockParticipation = []

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockParticipation,
      })

      await projectsApi.getUserProjectParticipation()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/participation',
        expect.any(Object)
      )
    })
  })

  describe('participateInProject', () => {
    it('should participate in project successfully', async () => {
      const mockResponse = { success: true, participation: 10 }

      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await projectsApi.participateInProject('1', 5)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/projects/1/participate',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 5 }),
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('ApiError', () => {
    it('should create ApiError with correct properties', () => {
      const error = new ApiError('Test error', 400, 'TEST_ERROR')

      expect(error.message).toBe('Test error')
      expect(error.status).toBe(400)
      expect(error.code).toBe('TEST_ERROR')
      expect(error.name).toBe('ApiError')
    })
  })
})
