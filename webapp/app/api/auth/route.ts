import { NextRequest, NextResponse } from 'next/server'

import { authenticateUser, generateServerSignature } from '@/lib/auth'
import {
  handleInvalidToken,
  handleMissingFields,
  handleServerError
} from '@/lib/handler'

async function handleAuthentication(
  publicToken: string,
  timestamp: number,
  signature: string
) {
  const isAuthenticated = await authenticateUser(
    publicToken,
    timestamp,
    signature
  )
  if (isAuthenticated) {
    return NextResponse.json({ message: 'Authentication successful' })
  } else {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

async function handleSignatureGeneration(
  publicToken: string,
  timestamp: number
) {
  const generatedSignature = await generateServerSignature(
    publicToken,
    timestamp
  )
  return NextResponse.json({ signature: generatedSignature })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const { publicToken, timestamp, signature } = body

    if (!publicToken || !timestamp) {
      return handleMissingFields()
    }

    if (publicToken !== process.env.NEXT_PUBLIC_AUTH_API_KEY) {
      return handleInvalidToken()
    }

    if (signature) {
      return handleAuthentication(publicToken, timestamp, signature)
    } else {
      return handleSignatureGeneration(publicToken, timestamp)
    }
  } catch (error) {
    return handleServerError(error)
  }
}
