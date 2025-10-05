"use client";

import { useRegisterForm } from '@/hooks/auth/use-register-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sprout, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function RegisterForm() {
  const {
    email,
    passphrase,
    error,
    loading,
    googleStep,
    handleEmailChange,
    handlePassphraseChange,
    handleEmailSubmit,
    handleGoogleAuth,
  } = useRegisterForm()

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
              <Image src="/icons/logo-treebyte.svg" alt="TreeByte Logo" width={80} height={80} className="w-20 h-20" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">Start planting the future</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Join the regenerative revolution. Plant trees, earn rewards, and help restore our planet through
                blockchain transparency.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {!googleStep && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="h-12 px-4 border-2 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl transition-all duration-300 bg-white/50"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sprout className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            )}

            {(googleStep || email) && (
              <div className="space-y-2">
                <Label htmlFor="passphrase" className="text-sm font-medium text-gray-700">
                  Secret Passphrase
                </Label>
                <Input
                  id="passphrase"
                  type="text"
                  placeholder="your unique secret phrase"
                  value={passphrase}
                  onChange={(e) => handlePassphraseChange(e.target.value)}
                  className="h-12 px-4 border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl transition-all duration-300 bg-white/50"
                />
                <div className="flex items-start gap-2 text-xs text-yellow-700 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
                  <ShieldCheck className="w-4 h-4 mt-[2px]" />
                  <span>
                    This passphrase is your only way to recover your wallet. It’s not a password.
                    <br />
                    <strong>Save it securely</strong> and never share it with anyone.
                  </span>
                </div>
              </div>
            )}



            <Button
              onClick={handleEmailSubmit}
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? (
                'Creating Wallet...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {googleStep ? 'Finish with Google' : 'Continue Growing'}
                  <Sprout className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                </span>
              )}
            </Button>

            {!googleStep && (
              <>
                <div className="relative flex items-center justify-center py-4">
                  <Separator className="bg-emerald-200" />
                  <div className="absolute bg-white px-4 text-sm text-gray-500 font-medium">OR</div>
                </div>

                <Button
                  onClick={() => handleGoogleAuth()}
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Image src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                  Continue with Google
                </Button>
              </>
            )}
          </div>

          <div className="text-center space-y-3 pt-4">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 underline">
                Privacy Policy
              </a>
            </p>

            <a
              href="/recover"
              className="inline-block text-sm text-emerald-600 hover:text-emerald-700 font-medium underline transition-all"
            >
              Already have a wallet? Recover it here
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
