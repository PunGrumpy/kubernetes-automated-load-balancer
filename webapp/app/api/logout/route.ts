import { NextResponse } from 'next/server'

import { getSession } from '@/lib/session'

export async function POST() {
  try {
    const session = await getSession()
    await session.destroy()

    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error during logout' },
      { status: 500 }
    )
  }
}
