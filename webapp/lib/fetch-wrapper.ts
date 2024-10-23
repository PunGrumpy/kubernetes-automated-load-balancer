export async function fetchWrapper<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.statusText} (${response.status})`
    )
  }
  return response.json()
}
