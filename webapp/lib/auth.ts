'use server'

import { createHmac } from 'crypto'

export async function generateServerSignature(
  publicToken: string,
  timestamp: number
): Promise<string> {
  const data = `${publicToken}:${timestamp}`
  return createHmac('sha256', process.env.AUTH_API_KEY!)
    .update(data)
    .digest('hex')
}

export async function verifySignature(
  publicToken: string,
  timestamp: number,
  signature: string
): Promise<boolean> {
  const fiveMinutes = 5 * 60 * 1000
  if (Date.now() - timestamp > fiveMinutes) {
    return false
  }

  const expectedSignature = await generateServerSignature(
    publicToken,
    timestamp
  )
  return expectedSignature === signature
}
