import { NextResponse } from 'next/server'

export async function handleMissingFields() {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  )
}

export async function handleInvalidToken() {
  return NextResponse.json({ error: 'Invalid public token' }, { status: 401 })
}

export async function handleUnauthorized() {
  return NextResponse.json(
    { error: 'Unauthorized - Please authenticate first' },
    { status: 401 }
  )
}

export function handleServerError(error: unknown) {
  console.error('Error processing request:', error)
  return NextResponse.json(
    { error: 'Failed to process request' },
    { status: 500 }
  )
}
