import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getDeviceData } from '@/lib/utils'

const TRACKING_DAYS = 7

export async function GET(request: NextRequest) {
  const url = request.nextUrl.origin + '/blocked'

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      'Cache-Control': 's-maxage=0'
    }
  })
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  if (token !== process.env.AUTH_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const deviceData = getDeviceData(request)

  try {
    await analytics.track('api_request', deviceData)
    const requests = await analytics.retrieveLastDays(
      'api_request',
      TRACKING_DAYS
    )

    return NextResponse.json({
      message: 'Request tracked successfully',
      timeseriesRequests: requests
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
