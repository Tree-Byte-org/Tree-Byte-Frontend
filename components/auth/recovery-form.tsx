'use client'

import { useRecovery } from '@/hooks/auth/use-recovery'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function RecoveryForm() {
  const {
    encryptedKey,
    setEncryptedKey,
    passphrase,
    setPassphrase,
    handleRecover,
    publicKey,
    error,
    loading,
  } = useRecovery()

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-100/30 to-transparent pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 100" fill="none">
          <path d="M0 80 Q100 60 200 80 T400 80" stroke="rgb(16 185 129 / 0.1)" strokeWidth="2" fill="none" />
          <path d="M0 85 Q150 65 300 85 T400 85" stroke="rgb(5 150 105 / 0.1)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <img src="/icons/logo-treebyte.svg" alt="TreeByte Logo" className="w-20 h-20" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">Recover your Wallet</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Paste your encrypted backup and enter your secret passphrase to restore access to your wallet.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="encryptedKey" className="text-sm font-medium text-gray-700">
                Encrypted Secret Key
              </label>
              <Textarea
                id="encryptedKey"
                value={encryptedKey}
                onChange={(e) => setEncryptedKey(e.target.value)}
                placeholder="Paste the encrypted key you received"
                rows={4}
                className="bg-white/50 border-2 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl h-auto"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="passphrase" className="text-sm font-medium text-gray-700">
                Secret Passphrase
              </label>
              <Input
                id="passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter your secret passphrase"
                className="h-12 px-4 border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl transition-all duration-300 bg-white/50"
              />
              <div className="flex items-start gap-2 text-xs text-yellow-700 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
                <ShieldCheck className="w-4 h-4 mt-[2px]" />
                <span>
                  This passphrase was used to encrypt your wallet. It&apos;s required to unlock your access.{' '}
                  <strong>Keep it safe</strong> and never share it.
                </span>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}
            {publicKey && <p className="text-sm text-green-600 font-medium text-center">Wallet Recovered: {publicKey}</p>}

            <Button
              onClick={handleRecover}
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? (
                'Recovering...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Recover Wallet
                  <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-90' : ''}`} />
                </span>
              )}
            </Button>

            <div className="text-center pt-2">
              <a
                href="/register"
                className="inline-block text-sm text-emerald-600 hover:text-emerald-700 font-medium underline transition-all"
              >
                ← Back to registration
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
