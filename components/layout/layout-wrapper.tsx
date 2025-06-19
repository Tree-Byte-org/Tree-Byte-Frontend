'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MainNavigation } from '@/components/main-navigation'

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const hideNav = pathname === '/register'

  return (
    <>
      {!hideNav && <MainNavigation />}
      <main className="min-h-screen">{children}</main>
    </>
  )
}
