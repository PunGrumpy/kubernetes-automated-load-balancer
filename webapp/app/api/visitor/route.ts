import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'
import { handleServerError, handleUnauthorized } from '@/lib/handler'
import { getSession } from '@/lib/session'
import { getDeviceData } from '@/lib/utils'

const TRACKING_DAYS = 7

async function handleTracking(request: NextRequest) {
  const deviceData = getDeviceData(request)
  await analytics.track('api_request', deviceData)
  const requests = await analytics.retrieveLastDays(
    'api_request',
    TRACKING_DAYS
  )
  return NextResponse.json({
    message: 'Request tracked successfully',
    timeseriesRequests: requests
  })
}

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
  try {
    const session = await getSession()

    if (!session.isLoggedIn) {
      return handleUnauthorized()
    }

    return handleTracking(request)
  } catch (error) {
    return handleServerError(error)
  }
}
