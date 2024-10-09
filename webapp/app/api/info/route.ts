import { NextResponse } from 'next/server'
import os from 'os'

let visitorCount = 0

export async function GET() {
  visitorCount++

  const cpuUsage = os.loadavg()[0]
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()
  const usedMemory = totalMemory - freeMemory

  return NextResponse.json({
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
  })
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

function formatUptime(uptime: number): string {
  const days = Math.floor(uptime / 86400)
  const hours = Math.floor((uptime % 86400) / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
