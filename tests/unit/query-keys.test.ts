import { describe, it, expect } from 'vitest'
import { queryKeys } from '@/lib/query/query-keys'

describe('Query Keys', () => {
  describe('Projects', () => {
    it('should generate correct project list keys', () => {
      const listKey = queryKeys.projects.list()
      expect(listKey).toEqual(['projects', 'list', undefined])

      const listKeyWithFilters = queryKeys.projects.list({ status: 'active' })
      expect(listKeyWithFilters).toEqual(['projects', 'list', { status: 'active' }])
    })

    it('should generate correct project detail keys', () => {
      const projectId = 'test-project-123'
      const detailKey = queryKeys.projects.detail(projectId)
      expect(detailKey).toEqual(['projects', 'detail', projectId])
    })

    it('should generate correct favorites keys', () => {
      const favoritesKey = queryKeys.projects.favorites()
      expect(favoritesKey).toEqual(['projects', 'favorites'])
    })

    it('should generate correct user participation keys', () => {
      const userId = 'user-123'
      const participationKey = queryKeys.projects.userParticipation(userId)
      expect(participationKey).toEqual(['projects', 'participation', userId])

      const participationKeyNoUser = queryKeys.projects.userParticipation()
      expect(participationKeyNoUser).toEqual(['projects', 'participation', undefined])
    })

    it('should maintain hierarchical structure', () => {
      const allKey = queryKeys.projects.all
      const listsKey = queryKeys.projects.lists()
      const detailsKey = queryKeys.projects.details()

      expect(allKey).toEqual(['projects'])
      expect(listsKey).toEqual(['projects', 'list'])
      expect(detailsKey).toEqual(['projects', 'detail'])
    })
  })

  describe('Users', () => {
    it('should generate correct user detail keys', () => {
      const userId = 'user-123'
      const detailKey = queryKeys.users.detail(userId)
      expect(detailKey).toEqual(['users', 'detail', userId])
    })

    it('should generate correct user profile keys', () => {
      const profileKey = queryKeys.users.profile()
      expect(profileKey).toEqual(['users', 'profile'])
    })
  })

  describe('Dashboard', () => {
    it('should generate correct dashboard stats keys', () => {
      const statsKey = queryKeys.dashboard.stats()
      expect(statsKey).toEqual(['dashboard', 'stats'])
    })

    it('should generate correct dashboard activity keys', () => {
      const activityKey = queryKeys.dashboard.recentActivity()
      expect(activityKey).toEqual(['dashboard', 'activity'])
    })
  })
})
