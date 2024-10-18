import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getGeoFromIP } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('X-Forwarded-For')?.split(',')[0] ||
    request.ip ||
    'Unknown'
  const geo = await getGeoFromIP(ip)
  const country = geo || 'Unknown'

  try {
    await analytics.track('api_request', { country })

    const TRACKING_DAYS = 7
    const requests = await analytics.retrieveLastDays(
      'api_request',
      TRACKING_DAYS
    )

    const topCountriesMap = new Map<string, number>()

    for (const day of requests) {
      for (const event of day.events) {
        const key = Object.keys(event)[0]!
        const value = Object.values(event)[0]!
        const parsedKey = JSON.parse(key)
        const country = parsedKey?.country

        if (country) {
          topCountriesMap.set(
            country,
            (topCountriesMap.get(country) || 0) + value
          )
        }
      }
    }

    const topCountries = Array.from(topCountriesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return NextResponse.json({
      message: `Request tracked successfully from ${ip}`,
      timeseriesRequests: requests,
      topCountries
    })
  } catch (error) {
    console.error('Error tracking API request:', error)
    return NextResponse.json(
      { error: 'Failed to track request' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('X-Forwarded-For')?.split(',')[0] ||
    request.ip ||
    'Unknown'

  const geo = await getGeoFromIP(ip)
  const country = geo || 'Unknown'

  try {
    await analytics.track('api_request', { country })
    return NextResponse.json({ message: 'Request tracked successfully' })
  } catch (error) {
    console.error('Error tracking API request:', error)
    return NextResponse.json(
      { error: 'Failed to track request' },
      { status: 500 }
    )
  }
}
