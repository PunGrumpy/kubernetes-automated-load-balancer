import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import { SessionData } from '@/types'

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: 'api_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  }
}

export async function getSession() {
  'use server'

  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}
