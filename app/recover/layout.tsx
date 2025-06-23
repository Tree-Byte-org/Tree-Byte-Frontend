'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export default function RecoverLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      {children}
    </ThemeProvider>
  )
}
