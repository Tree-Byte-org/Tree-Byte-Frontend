import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProjects } from '@/hooks/projects/use-projects'

describe('useProjects', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('loads projects successfully', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ([{ id: '1', name: 'p' }]) })) as any)
    const { result } = renderHook(() => useProjects())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeNull()
    expect(result.current.projects.length).toBeGreaterThan(0)
  })

  it('retries on failure and sets error after retries', async () => {
    let calls = 0
    vi.stubGlobal('fetch', vi.fn(async () => {
      calls++
      return { ok: false, status: 500, json: async () => ({}) } as any
    }))
    const { result } = renderHook(() => useProjects())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(calls).toBeGreaterThanOrEqual(3) // initial + 2 retries (may be 3 exact)
    expect(result.current.error).toBeInstanceOf(Error)
  })
})


