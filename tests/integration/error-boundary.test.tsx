import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

function Boom() {
  throw new Error('Render failed')
}

describe('ErrorBoundary', () => {
  it('renders fallback UI on render error', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )

    expect(screen.getByText(/Something went wrong|Network issue|Authentication error|Validation error|Stellar error/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument()
  })
})


