import { type ClassValue, clsx } from 'clsx'
import { NextRequest, userAgent } from 'next/server'
import { twMerge } from 'tailwind-merge'

import { DeviceData } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(daysAgo: number = 0): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

export function getDeviceData(request: NextRequest): DeviceData {
  const { browser, isBot } = userAgent(request)
  return {
    browser: browser.name || 'Unknown',
    isBot
  }
}
