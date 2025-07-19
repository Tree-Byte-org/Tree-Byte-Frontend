export const buyToken = async (projectId: string, userId: string, amount: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/buy-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: projectId, 
      user_id: userId,
      amount,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json();
};
