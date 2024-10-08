import { NextResponse } from 'next/server'
import os from 'os'

let visitorCount = 0

export async function GET() {
  visitorCount++

  return NextResponse.json({
    podName: os.hostname(),
    cpuUsage: os.loadavg()[0],
    visitorCount: visitorCount,
    serverTime: new Date().toISOString()
  })
}
