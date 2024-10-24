export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const timestamp = Date.now()
    const publicToken = process.env.NEXT_PUBLIC_AUTH_API_KEY!

    // Get signature from server
    const signResponse = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp,
        publicToken
      })
    })

    if (!signResponse.ok) {
      throw new Error('Failed to get signature')
    }

    const { signature } = await signResponse.json()

    // Make the actual request
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
