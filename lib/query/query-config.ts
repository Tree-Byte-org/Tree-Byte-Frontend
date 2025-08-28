/**
 * Default query configuration for React Query
 * Provides consistent settings across the application
 */

import type { QueryClient } from '@tanstack/react-query';

// Default query options
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  retry: (failureCount: number, error: any) => {
    // Retry up to 3 times with exponential backoff
    if (failureCount >= 3) return false;
    
    // Don't retry on 4xx errors (client errors)
    if (error?.status >= 400 && error?.status < 500) return false;
    
    return true;
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
} as const;

// Default mutation options
export const defaultMutationOptions = {
  retry: 1,
  retryDelay: 1000,
  onError: (error: any) => {
    console.error('Mutation error:', error);
    // You can integrate with your error handling system here
  },
} as const;

// Project-specific query options
export const projectQueryOptions = {
  ...defaultQueryOptions,
  staleTime: 2 * 60 * 1000, // 2 minutes for projects (more dynamic)
  refetchOnWindowFocus: true, // Projects should refetch when window gains focus
} as const;

// Dashboard-specific query options
export const dashboardQueryOptions = {
  ...defaultQueryOptions,
  staleTime: 1 * 60 * 1000, // 1 minute for dashboard (very dynamic)
  refetchInterval: 30 * 1000, // Refetch every 30 seconds
} as const;

// User-specific query options
export const userQueryOptions = {
  ...defaultQueryOptions,
  staleTime: 10 * 60 * 1000, // 10 minutes for user data (less dynamic)
} as const;

// Error handling configuration
export const errorConfig = {
  networkError: {
    message: 'Network error. Please check your connection.',
    retryable: true,
  },
  serverError: {
    message: 'Server error. Please try again later.',
    retryable: true,
  },
  clientError: {
    message: 'Invalid request. Please check your input.',
    retryable: false,
  },
  unauthorized: {
    message: 'Unauthorized. Please log in again.',
    retryable: false,
  },
} as const;

// Query client configuration helper
export const configureQueryClient = (queryClient: QueryClient) => {
  // Set default options
  queryClient.setDefaultOptions({
    queries: defaultQueryOptions,
    mutations: defaultMutationOptions,
  });

  // Add global error handling
  queryClient.setQueryDefaults(['projects'], projectQueryOptions);
  queryClient.setQueryDefaults(['dashboard'], dashboardQueryOptions);
  queryClient.setQueryDefaults(['users'], userQueryOptions);
};
