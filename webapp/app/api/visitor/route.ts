import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getSession } from '@/lib/session'
import { getDeviceData } from '@/lib/utils'

const TRACKING_DAYS = 7

export async function GET(request: NextRequest) {
  const domain = process.env.NEXT_PUBLIC_METADATA_BASE
    ? process.env.NEXT_PUBLIC_METADATA_BASE
    : request.url
  const url = new URL(domain + '/blocked')

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      'Cache-Control': 's-maxage=0'
    }
  })
}

export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session.isLoggedIn) {
    return NextResponse.json(
      { error: 'Unauthorized - Please authenticate first' },
      { status: 401 }
    )
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
