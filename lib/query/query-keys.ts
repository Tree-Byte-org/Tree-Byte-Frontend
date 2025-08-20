/**
 * Centralized query key management for React Query
 * Provides type-safe query key generation with hierarchical structure
 */

export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    lists: () => [...queryKeys.projects.all, 'list'] as const,
    list: (filters?: ProjectFilters) => [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.projects.details(), id] as const,
    favorites: () => [...queryKeys.projects.all, 'favorites'] as const,
    userParticipation: (userId?: string) => [...queryKeys.projects.all, 'participation', userId] as const,
  },
  users: {
    all: ['users'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    recentActivity: () => [...queryKeys.dashboard.all, 'activity'] as const,
  },
} as const;

// Type definitions for filters
export interface ProjectFilters {
  status?: 'active' | 'coming-soon' | 'completed';
  location?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

// Type helper for query keys
export type QueryKeys = typeof queryKeys;
