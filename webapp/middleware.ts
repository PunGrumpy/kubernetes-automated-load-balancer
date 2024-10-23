import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://pungrumpy.xyz', 'http://localhost:3000']

function isAllowedOrigin(origin: string | null): boolean {
  return origin !== null && allowedOrigins.includes(origin)
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

  if (request.nextUrl.pathname.startsWith('/api')) {
    if (!isAllowedOrigin(origin)) {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    }
  }

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
