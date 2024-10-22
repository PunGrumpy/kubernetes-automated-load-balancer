import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getDeviceData } from '@/lib/utils'

const CACHE_EXPIRY = 5 * 60 // 5 minutes
const TRACKING_DAYS = 7

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const deviceData = getDeviceData(request)

  try {
    let message: string
    if (deviceData.isBot) {
      message = 'Bot request noted'
      await analytics.trackBot()
    } else {
      message = 'Request tracked successfully'
      await analytics.track('api_request', deviceData)
    }

    const requests = await analytics.retrieveLastDays(
      'api_request',
      TRACKING_DAYS
    )

    return NextResponse.json(
      {
        message,
        timeseriesRequests: requests
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_EXPIRY}, stale-while-revalidate=30`
        }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
