import { NextRequest, NextResponse } from 'next/server'

import { analytics } from '@/lib/analytics'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    try {
      await analytics.track('pageview', {
        page: '/',
        country: req.geo?.country ?? 'Unknown'
      })
    } catch (err) {
      // fail silently to not affect request
      console.error('Analytics error:', err)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/']
}
