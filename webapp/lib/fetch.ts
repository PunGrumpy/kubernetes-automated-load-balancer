import { generateSignature } from '@/lib/auth'

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const timestamp = Date.now()
    const publicToken = process.env.NEXT_PUBLIC_AUTH_API_KEY!

    // Generate signature
    const signature = generateSignature(publicToken, timestamp)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        timestamp,
        signature,
        publicToken
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error ||
          `Request failed: ${response.statusText} (${response.status})`
      )
    }

    return response.json()
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('An unknown error occurred')
  }
}
