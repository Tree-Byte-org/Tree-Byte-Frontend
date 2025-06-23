'use client'

import { useState } from 'react'

export function useRecovery() {
  const [encryptedKey, setEncryptedKey] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
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
