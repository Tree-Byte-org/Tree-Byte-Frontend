import { useState } from 'react'
import { createWallet } from '@/services/wallet.service'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { useGoogleLogin } from '@react-oauth/google'

export const useRegisterForm = () => {
  const [email, setEmail] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleStep, setGoogleStep] = useState(false)
  const { handleError } = useErrorHandler()

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setError(null)
  }

  const handlePassphraseChange = (value: string) => {
    setPassphrase(value)
    setError(null)
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePassphrase = (phrase: string) => phrase.trim().length >= 8

  const submitInvisibleWallet = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email address')
      return
    }

    if (!validatePassphrase(passphrase)) {
      setError('Passphrase must be at least 8 characters long')
      return
    }

    setLoading(true)
    try {
      const result = await createWallet(email, passphrase)
      console.log('Wallet created:', result)
      // TODO: redirect or feedback
    } catch (err: unknown) {
      const appError = handleError(err, { context: { feature: 'register', email }, toast: true })
      setError(appError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })

        const profile = await res.json()
        const emailFromGoogle = profile?.email

        if (!emailFromGoogle) throw new Error('No email found from Google')

        setEmail(emailFromGoogle)
        setGoogleStep(true)
      } catch (err) {
        console.error('Google login error:', err)
        setError('Google login failed')
      }
    },
    onError: () => {
      setError('Google login failed')
    },
    flow: 'implicit',
  })

  return {
    email,
    passphrase,
    error,
    loading,
    googleStep,
    handleEmailChange,
    handlePassphraseChange,
    handleEmailSubmit: submitInvisibleWallet,
    handleGoogleAuth,
  }
}
