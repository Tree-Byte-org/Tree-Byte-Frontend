'use client'

import * as React from 'react'
import type { Project } from '@/types/project'
import { useErrorHandler } from '@/hooks/use-error-handler'

export function useProjects() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const { handleError } = useErrorHandler()

  React.useEffect(() => {
    let cancelled = false
    const initialDelay = process.env.NODE_ENV === 'test' ? 10 : 500
    const fetchWithRetry = async (retries = 2, delayMs = initialDelay): Promise<void> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) setProjects(data)
      } catch (err: unknown) {
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, delayMs))
          return fetchWithRetry(retries - 1, delayMs * 2)
        }
        const appError = handleError(err, { context: { feature: 'projects', endpoint: '/projects' }, toast: true })
        if (!cancelled) setError(new Error(appError.message))
      }
    }
    ;(async () => {
      setLoading(true)
      try {
        await fetchWithRetry()
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [handleError])

  return {
    projects,
    loading,
    error,
    refetch: () => {},
  }
}

