'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MainNavigation } from '@/components/layout/main-navigation'

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const hideNav = pathname.startsWith('/register') || pathname.startsWith('/recover') || pathname.startsWith('/dashboard') || pathname.startsWith('/coupons')

  return (
    <>
      {!hideNav && <MainNavigation />}
      <main className="min-h-screen">{children}</main>
    </>
  )
}
