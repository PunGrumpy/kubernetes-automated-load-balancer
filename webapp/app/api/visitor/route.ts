import { NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'

export async function GET() {
  try {
    await analytics.track('api_request')

    const TRACKING_DAYS = 7
    const requests = await analytics.retrieveLastDays(
      'api_request',
      TRACKING_DAYS
    )

    return NextResponse.json({
      message: `Request tracked successfully`,
      timeseriesRequests: requests
    })
  } catch (error) {
    console.error('Error tracking API request:', error)
    return NextResponse.json(
      { error: 'Failed to track request' },
      { status: 500 }
    )
  }
}
