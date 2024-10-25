import { NextRequest, NextResponse } from 'next/server'

import { authenticateUser, generateServerSignature } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { publicToken, timestamp, signature } = await request.json()

    if (publicToken !== process.env.NEXT_PUBLIC_AUTH_API_KEY) {
      return NextResponse.json(
        { error: 'Invalid public token' },
        { status: 401 }
      )
    }

    if (signature) {
      // This is an authentication request
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
    } else {
      // This is a signature generation request
      const generatedSignature = await generateServerSignature(
        publicToken,
        timestamp
      )
      return NextResponse.json({ signature: generatedSignature })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
