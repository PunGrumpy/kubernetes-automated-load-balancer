export const fetcher = async <T>(url: string): Promise<T> => {
  const apiKey = process.env.NEXT_PUBLIC_AUTH_API_KEY
  if (!apiKey) {
    throw new Error('API key is not available')
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userAgent: navigator.userAgent })
  })
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.statusText ?? 'Unknown error'} (${response.status})`
    )
  }
  return response.json()
}
