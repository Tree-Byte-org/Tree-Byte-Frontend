/**
 * Centralized API functions for projects
 * Provides TypeScript typing for requests/responses
 * Handles error handling and response transformation
 */

import type { Project } from '@/types/project';
import type { ProjectFilters } from '@/lib/query/query-keys';

// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response wrapper type
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Enhanced Project type with additional fields for better UX
export interface EnhancedProject extends Project {
  title: string;
  isFavorite?: boolean;
  userParticipation?: number;
  lastUpdated?: string;
  status?: 'active' | 'coming-soon' | 'completed';
  rating?: number;
  capacity?: string;
  remaining?: string;
  annualImpact?: string;
  about?: string;
  mission?: string;
  species?: string[];
  activities?: string[];
  thumbnails?: string[];
}

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData.code
    );
  }

  const data = await response.json();
  return data;
}

// Helper function to build query parameters
function buildQueryParams(filters?: ProjectFilters): string {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  
  return params.toString();
}

/**
 * Get all projects with optional filters
 */
export async function getProjects(filters?: ProjectFilters): Promise<EnhancedProject[]> {
  try {
    const queryParams = buildQueryParams(filters);
    const url = `${API_BASE_URL}/projects${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleApiResponse<EnhancedProject[]>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch projects',
      500,
      'FETCH_ERROR'
    );
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(id: string): Promise<EnhancedProject> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleApiResponse<EnhancedProject>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch project',
      500,
      'FETCH_ERROR'
    );
  }
}

/**
 * Get user's favorite projects
 */
export async function getFavoriteProjects(): Promise<EnhancedProject[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header when auth is implemented
        // 'Authorization': `Bearer ${token}`,
      },
    });

    return handleApiResponse<EnhancedProject[]>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch favorite projects',
      500,
      'FETCH_ERROR'
    );
  }
}

/**
 * Toggle project favorite status
 */
export async function toggleProjectFavorite(projectId: string): Promise<{ isFavorite: boolean }> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header when auth is implemented
        // 'Authorization': `Bearer ${token}`,
      },
    });

    return handleApiResponse<{ isFavorite: boolean }>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to toggle project favorite',
      500,
      'FETCH_ERROR'
    );
  }
}

/**
 * Get user participation in projects
 */
export async function getUserProjectParticipation(userId?: string): Promise<EnhancedProject[]> {
  try {
    const url = userId 
      ? `${API_BASE_URL}/projects/participation/${userId}`
      : `${API_BASE_URL}/projects/participation`;
      
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header when auth is implemented
        // 'Authorization': `Bearer ${token}`,
      },
    });

    return handleApiResponse<EnhancedProject[]>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to fetch user participation',
      500,
      'FETCH_ERROR'
    );
  }
}

/**
 * Participate in a project
 */
export async function participateInProject(projectId: string, amount: number): Promise<{ success: boolean; participation: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/participate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header when auth is implemented
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    return handleApiResponse<{ success: boolean; participation: number }>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to participate in project',
      500,
      'FETCH_ERROR'
    );
  }
}

// Export all API functions
export const projectsApi = {
  getProjects,
  getProject,
  getFavoriteProjects,
  toggleProjectFavorite,
  getUserProjectParticipation,
  participateInProject,
};
