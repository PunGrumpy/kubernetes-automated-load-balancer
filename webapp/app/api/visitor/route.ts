import { NextRequest, NextResponse, userAgent } from 'next/server'

import { analytics } from '@/lib/analytics'
import { DeviceData } from '@/types'

export async function GET(request: NextRequest) {
  const { browser, isBot } = userAgent(request)
  const deviceData: DeviceData = {
    browser: browser.name || 'Unknown',
    isBot
  }

  if (!isBot) {
    try {
      await analytics.track('api_request', deviceData)

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
  } else {
    return NextResponse.json(
      { message: 'Request not tracked for bots' },
      { status: 200 }
    )
  }
}
