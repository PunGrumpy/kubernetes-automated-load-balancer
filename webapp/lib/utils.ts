import { type ClassValue, clsx } from 'clsx'
import { format, subDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(subtract: number = 0): string {
  const dateXDaysAgo = subDays(new Date(), subtract)
  return format(dateXDaysAgo, 'MM/dd/yyyy')
}
