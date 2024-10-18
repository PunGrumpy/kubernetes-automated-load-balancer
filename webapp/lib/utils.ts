import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(daysAgo: number = 0): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

export async function getGeoFromIP(ip: string): Promise<string> {
  const response = await fetch(`http://ip-api.com/json/${ip}`)
  const data = await response.json()
  return data.countryCode
}
