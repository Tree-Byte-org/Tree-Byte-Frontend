type Props = {
  error: string
  publicKey: string
}

export function RecoveryResult({ error, publicKey }: Props) {
  if (error) {
    return <p className="text-red-600 font-medium">{error}</p>
  }

  if (publicKey) {
    return <p className="text-green-600 font-medium">✅ Wallet recovered: {publicKey}</p>
  }

  return null
}
