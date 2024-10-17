import { type ClassValue, clsx } from 'clsx'
import { format, subDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

export function formatUptime(uptime: number): string {
  const days = Math.floor(uptime / 86400)
  const hours = Math.floor((uptime % 86400) / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function getDate(subtract: number = 0): string {
  const dateXDaysAgo = subDays(new Date(), subtract)
  return format(dateXDaysAgo, 'MM/dd/yyyy')
}
