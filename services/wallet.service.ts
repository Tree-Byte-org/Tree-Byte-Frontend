export const createWallet = async (email: string, passphrase: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, passphrase }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Unknown error')
  }

  return data
}
