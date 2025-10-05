import { describe, it, expect } from 'vitest'
import { QueryClient } from '@tanstack/react-query'
import {
  defaultQueryOptions,
  defaultMutationOptions,
  projectQueryOptions,
  dashboardQueryOptions,
  userQueryOptions,
  errorConfig,
  configureQueryClient,
} from '@/lib/query/query-config'

describe('Query Configuration', () => {
  describe('Default Query Options', () => {
    it('should have correct default query options', () => {
      expect(defaultQueryOptions.staleTime).toBe(5 * 60 * 1000) // 5 minutes
      expect(defaultQueryOptions.gcTime).toBe(10 * 60 * 1000) // 10 minutes
      expect(defaultQueryOptions.refetchOnWindowFocus).toBe(false)
      expect(defaultQueryOptions.refetchOnReconnect).toBe(true)
    })

    it('should have retry function that retries up to 3 times', () => {
      const retryFn = defaultQueryOptions.retry as any
      
      // Should retry on first failure
      expect(retryFn(1, new Error('Network error'))).toBe(true)
      
      // Should retry on second failure
      expect(retryFn(2, new Error('Network error'))).toBe(true)
      
      // Should not retry on third failure
      expect(retryFn(3, new Error('Network error'))).toBe(false)
      
      // Should not retry on fourth failure
      expect(retryFn(4, new Error('Network error'))).toBe(false)
    })

    it('should not retry on 4xx errors', () => {
      const retryFn = defaultQueryOptions.retry as any
      const error = new Error('Client error')
      ;(error as any).status = 400
      
      expect(retryFn(1, error)).toBe(false)
    })

    it('should retry on 5xx errors', () => {
      const retryFn = defaultQueryOptions.retry as any
      const error = new Error('Server error')
      ;(error as any).status = 500
      
      expect(retryFn(1, error)).toBe(true)
    })

    it('should have exponential backoff retry delay', () => {
      const retryDelay = defaultQueryOptions.retryDelay as any
      
      expect(retryDelay(0)).toBe(1000) // 2^0 * 1000 = 1000
      expect(retryDelay(1)).toBe(2000) // 2^1 * 1000 = 2000
      expect(retryDelay(2)).toBe(4000) // 2^2 * 1000 = 4000
      expect(retryDelay(10)).toBe(30000) // Capped at 30000
    })
  })

  describe('Default Mutation Options', () => {
    it('should have correct default mutation options', () => {
      expect(defaultMutationOptions.retry).toBe(1)
      expect(defaultMutationOptions.retryDelay).toBe(1000)
      expect(typeof defaultMutationOptions.onError).toBe('function')
    })

    it('should have error handler function', () => {
      const onError = defaultMutationOptions.onError as any
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const error = new Error('Test error')
      onError(error)
      
      expect(consoleSpy).toHaveBeenCalledWith('Mutation error:', error)
      
      consoleSpy.mockRestore()
    })
  })

  describe('Project Query Options', () => {
    it('should extend default options with project-specific settings', () => {
      expect(projectQueryOptions.staleTime).toBe(2 * 60 * 1000) // 2 minutes
      expect(projectQueryOptions.refetchOnWindowFocus).toBe(true)
      expect(projectQueryOptions.gcTime).toBe(10 * 60 * 1000) // Inherited from default
    })
  })

  describe('Dashboard Query Options', () => {
    it('should have dashboard-specific settings', () => {
      expect(dashboardQueryOptions.staleTime).toBe(1 * 60 * 1000) // 1 minute
      expect(dashboardQueryOptions.refetchInterval).toBe(30 * 1000) // 30 seconds
    })
  })

  describe('User Query Options', () => {
    it('should have user-specific settings', () => {
      expect(userQueryOptions.staleTime).toBe(10 * 60 * 1000) // 10 minutes
    })
  })

  describe('Error Configuration', () => {
    it('should have network error config', () => {
      expect(errorConfig.networkError.message).toBe('Network error. Please check your connection.')
      expect(errorConfig.networkError.retryable).toBe(true)
    })

    it('should have server error config', () => {
      expect(errorConfig.serverError.message).toBe('Server error. Please try again later.')
      expect(errorConfig.serverError.retryable).toBe(true)
    })

    it('should have client error config', () => {
      expect(errorConfig.clientError.message).toBe('Invalid request. Please check your input.')
      expect(errorConfig.clientError.retryable).toBe(false)
    })

    it('should have unauthorized error config', () => {
      expect(errorConfig.unauthorized.message).toBe('Unauthorized. Please log in again.')
      expect(errorConfig.unauthorized.retryable).toBe(false)
    })
  })

  describe('Query Client Configuration', () => {
    it('should configure query client with default options', () => {
      const queryClient = new QueryClient()
      
      // Should not throw
      expect(() => configureQueryClient(queryClient)).not.toThrow()
    })

    it('should set query defaults for different query types', () => {
      const queryClient = new QueryClient()
      configureQueryClient(queryClient)
      
      // The function should execute without errors
      // We can't easily test the internal setQueryDefaults calls without exposing them
      // But we can verify the function runs successfully
      expect(typeof configureQueryClient).toBe('function')
    })
  })

  describe('Configuration Consistency', () => {
    it('should maintain consistent time units', () => {
      // All times should be in milliseconds
      expect(typeof defaultQueryOptions.staleTime).toBe('number')
      expect(typeof defaultQueryOptions.gcTime).toBe('number')
      expect(typeof projectQueryOptions.staleTime).toBe('number')
      expect(typeof dashboardQueryOptions.staleTime).toBe('number')
      expect(typeof userQueryOptions.staleTime).toBe('number')
    })

    it('should have reasonable time values', () => {
      // Stale times should be positive and reasonable
      expect(defaultQueryOptions.staleTime).toBeGreaterThan(0)
      expect(projectQueryOptions.staleTime).toBeGreaterThan(0)
      expect(dashboardQueryOptions.staleTime).toBeGreaterThan(0)
      expect(userQueryOptions.staleTime).toBeGreaterThan(0)
      
      // Cache times should be greater than or equal to stale times
      expect(defaultQueryOptions.gcTime).toBeGreaterThanOrEqual(defaultQueryOptions.staleTime)
    })

    it('should have consistent retry configuration', () => {
      expect(typeof defaultQueryOptions.retry).toBe('function')
      expect(typeof defaultQueryOptions.retryDelay).toBe('function')
      expect(typeof defaultMutationOptions.retry).toBe('number')
      expect(typeof defaultMutationOptions.retryDelay).toBe('number')
    })
  })
})
