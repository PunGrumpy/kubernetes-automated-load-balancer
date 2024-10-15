import { NextResponse } from 'next/server'

import { register } from '@/lib/metrics'

export async function GET() {
  try {
    const metrics = await register.metrics()
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': register.contentType
      }
    })
  } catch (error) {
    console.error('Error generating metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
