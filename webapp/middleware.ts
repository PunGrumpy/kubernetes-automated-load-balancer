import { NextRequest, NextResponse } from 'next/server'

import {
  httpRequestCounter,
  httpRequestDurationMicroseconds
} from '@/lib/metrics'

export function middleware(request: NextRequest): NextResponse {
  const start = Date.now()

  const response = NextResponse.next()

  response.headers.set('x-middleware-cache', 'no-cache')

  const end = Date.now()
  const duration = (end - start) / 1000 // Convert to seconds

  const { method, url } = request
  const status = response.status

  httpRequestCounter.inc({ method, route: url, status_code: status.toString() })
  httpRequestDurationMicroseconds.observe(
    { method, route: url, status_code: status.toString() },
    duration
  )

  return response
}

export const config = {
  matcher: ['/((?!api/metrics|_next/static|_next/image|favicon.ico).*)']
}
