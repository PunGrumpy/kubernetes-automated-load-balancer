import { NextResponse } from 'next/server'
import os from 'os'

import { redis } from '@/lib/db'
import { formatBytes, formatUptime } from '@/lib/utils'

export async function GET() {
  try {
    const visitorCount = await redis.incr('visitor_count')

    const cpuUsage = os.loadavg()[0]
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    const usedMemory = totalMemory - freeMemory

    const data = {
      podName: os.hostname(),
      cpuUsage: cpuUsage.toFixed(2),
      memoryUsage: {
        total: formatBytes(totalMemory),
        used: formatBytes(usedMemory),
        free: formatBytes(freeMemory),
        percentage: ((usedMemory / totalMemory) * 100).toFixed(2)
      },
      visitorCount: visitorCount,
      serverTime: new Date().toISOString(),
      osInfo: {
        platform: os.platform(),
        release: os.release(),
        uptime: formatUptime(os.uptime())
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in API:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
