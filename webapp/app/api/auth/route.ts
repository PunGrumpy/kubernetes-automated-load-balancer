import { NextRequest, NextResponse } from 'next/server'

import { generateServerSignature } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { publicToken, timestamp } = await request.json()

    if (publicToken !== process.env.NEXT_PUBLIC_AUTH_API_KEY) {
      return NextResponse.json(
        { error: 'Invalid public token' },
        { status: 401 }
      )
    }

    const signature = await generateServerSignature(publicToken, timestamp)
    return NextResponse.json({ signature })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    )
  }
}
