'use client'

import Link from 'next/link'
import { useWallet } from '@/hooks/use-wallet.hook'
import { useGlobalAuthenticationStore } from '@/data'
import { LogIn, UserPlus, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function CtaButton({ scrolled, pathname }: { scrolled: boolean; pathname: string }) {
  const { handleConnect, handleDisconnect } = useWallet()
  const address = useGlobalAuthenticationStore((state) => state.address)

  const translucentBtn =
    'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
  const solidBtn = 'bg-green-600 text-white hover:bg-green-700 transition-colors'
  const sharedStyle =
    'transition-all px-5 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium'
  const currentStyle = scrolled || pathname !== '/' ? solidBtn : translucentBtn

  return (
    <div className="flex items-center space-x-3">
      <Link href="/login">
        <Button className={cn(sharedStyle, currentStyle)}>
          <LogIn className="h-4 w-4" />
          <span>Log in</span>
        </Button>
      </Link>

      <Link href="/register">
        <Button className={cn(sharedStyle, currentStyle)}>
          <UserPlus className="h-4 w-4" />
          <span>Sign up</span>
        </Button>
      </Link>

      <Button
        onClick={address ? handleDisconnect : handleConnect}
        className={cn(sharedStyle, currentStyle)}
      >
        <Wallet className="h-4 w-4" />
        <span>{address ? 'Disconnect Wallet' : 'Connect Wallet'}</span>
      </Button>
    </div>
  )
}
