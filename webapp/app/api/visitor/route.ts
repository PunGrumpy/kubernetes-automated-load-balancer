import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { country } = body

  if (!country) {
    return NextResponse.json({ error: 'Country is required' }, { status: 400 })
  }

  try {
    await analytics.track('api_request', {
      country
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking API request:', error)
    return NextResponse.json(
      { error: 'Failed to track API request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
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
      timeseriesRequests: requests,
      topCountries
    })
  } catch (error) {
    console.error('Error retrieving API request data:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve API request data' },
      { status: 500 }
    )
  }
}
