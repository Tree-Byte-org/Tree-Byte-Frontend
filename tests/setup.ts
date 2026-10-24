import '@testing-library/jest-dom/vitest'
import React from 'react'

// Set global React for JSX transform in test environment
;(globalThis as any).React = React

// Polyfills minimal for Next.js environment in tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
