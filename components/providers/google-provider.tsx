'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export function GoogleProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="14935620441-237ovcgncenv1ncb7abke8odanfhjvev.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  )
}
