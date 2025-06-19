import { useState } from 'react'

export const useRegisterForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setError(null)
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleEmailSubmit = () => {
    if (!validateEmail(email)) {
      setError('Invalid email address')
      return
    }

    // Handle the email submit logic (e.g., API call)
    console.log('Email submitted:', email)
  }

  const handleGoogleAuth = () => {
    // Trigger OAuth flow (handled separately)
    console.log('Google sign-in clicked')
  }

  return {
    email,
    error,
    handleEmailChange,
    handleEmailSubmit,
    handleGoogleAuth,
  }
}
