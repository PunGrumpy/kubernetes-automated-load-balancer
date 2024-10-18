import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { getGeo } from '@/lib/utils'

export async function GET(request: NextRequest) {
  console.log(request)
  let ip = request.headers.get('X-Forwarded-For')
  if (ip?.includes('::ffff:')) {
    ip = ip.replace('::ffff:', '')
  }
  const geo = await getGeo(ip || '8.8.8.8')
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
      message: 'Request tracked successfully',
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
  const country = request.geo?.country || 'Unknown'

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
