import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

import { verifySignature } from '@/lib/auth'
import { getSession } from '@/lib/session'
import { AuthRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const publicToken = authHeader.split(' ')[1]
    if (publicToken !== process.env.NEXT_PUBLIC_AUTH_API_KEY) {
      return NextResponse.json(
        { error: 'Invalid public token' },
        { status: 401 }
      )
    }

    const body: AuthRequest = await request.json()

    if (!verifySignature(publicToken, body.timestamp, body.signature)) {
      return NextResponse.json(
        { error: 'Invalid signature or expired timestamp' },
        { status: 401 }
      )
    }

    const session = await getSession()
    session.isLoggedIn = true
    session.sessionToken = nanoid()
    await session.save()

    return NextResponse.json({
      message: 'Authenticated successfully',
      sessionToken: session.sessionToken
    })
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    )
  }
}
