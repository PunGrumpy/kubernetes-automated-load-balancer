import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getDeviceData } from '@/lib/utils'

const TRACKING_DAYS = 7

export const runtime = 'edge'

export async function GET(request: NextRequest) {
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
