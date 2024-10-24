'use server'

import { createHmac } from 'crypto'

export async function generateSignature(
  publicToken: string,
  timestamp: number
): Promise<string> {
  const data = `${publicToken}:${timestamp}`
  const signature = createHmac('sha256', process.env.AUTH_API_KEY!)
    .update(data)
    .digest('hex')
  return signature
}

export async function verifySignature(
  publicToken: string,
  timestamp: number,
  signature: string
): Promise<boolean> {
  // Check if timestamp is not too old (5 minutes)
  const fiveMinutes = 5 * 60 * 1000
  if (Date.now() - timestamp > fiveMinutes) {
    return false
  }

  const expectedSignature = generateSignature(publicToken, timestamp)
  return (await expectedSignature) === signature
}
