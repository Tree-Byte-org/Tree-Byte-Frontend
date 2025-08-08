'use client'

import { useState } from 'react'
import { useErrorHandler } from '@/hooks/use-error-handler'

export function useRecovery() {
  const [encryptedKey, setEncryptedKey] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { handleError } = useErrorHandler()

  const handleRecover = async () => {
    setLoading(true)
    setError('')
    setPublicKey('')

    try {
      const response = await fetch('/api/wallet/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedKey,
          passphrase,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Recovery failed')
      }

      setPublicKey(result.publicKey)
    } catch (err: unknown) {
      const appError = handleError(err, { context: { feature: 'recovery' }, toast: true })
      setError(appError.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {
    encryptedKey,
    setEncryptedKey,
    passphrase,
    setPassphrase,
    handleRecover,
    publicKey,
    error,
    loading,
  }
}
