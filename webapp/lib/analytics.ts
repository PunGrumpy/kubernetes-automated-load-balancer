import { parse } from 'date-fns'

import { redis } from '@/lib/db'
import { getDate } from '@/lib/utils'

interface AnalyticsOptions {
  retention?: number
}

interface TrackSettings {
  persistent?: boolean
}

interface AnalyticsEvent {
  [key: string]: number
}

interface DailyAnalytics {
  date: string
  events: AnalyticsEvent[]
}

export class Analytics {
  private retentionPeriod: number = 7 * 24 * 60 * 60 // 7 days

  constructor(options?: AnalyticsOptions) {
    if (options?.retention) {
      this.retentionPeriod = options.retention
    }
  }

  async track(
    namespace: string,
    event: object = {},
    settings?: TrackSettings
  ): Promise<void> {
    let key = `analytics::${namespace}`

    if (!settings?.persistent) {
      key += `::${getDate()}`
    }

    try {
      // Persist event to Redis
      await redis.hincrby(key, JSON.stringify(event), 1)

      // Set expiration if event is not persistent and retentionPeriod is not -1
      if (!settings?.persistent && this.retentionPeriod !== -1) {
        await redis.expire(key, this.retentionPeriod)
      }
    } catch (error) {
      console.error('Error tracking analytics:', error)
    }
  }

  async retrieveLastDays(
    namespace: string,
    days: number
  ): Promise<DailyAnalytics[]> {
    const retrievePromises = Array.from({ length: days }, (_, i) => {
      const date = getDate(i)
      return this.retrieve(namespace, date)
    })

    try {
      const results = await Promise.all(retrievePromises)

      // Sort results by date
      return results.sort((a, b) =>
        parse(a.date, 'dd/MM/yyyy', new Date()) >
        parse(b.date, 'dd/MM/yyyy', new Date())
          ? 1
          : -1
      )
    } catch (error) {
      console.error('Error retrieving analytics:', error)
      return []
    }
  }

  async retrieve(namespace: string, date: string): Promise<DailyAnalytics> {
    try {
      const events = await redis.hgetall<Record<string, string>>(
        `analytics::${namespace}::${date}`
      )

      // Convert retrieved events to array of key-value pairs
      return {
        date,
        events: Object.entries(events ?? {}).map(([key, value]) => ({
          [key]: Number(value)
        }))
      }
    } catch (error) {
      console.error('Error retrieving daily analytics:', error)
      return { date, events: [] }
    }
  }
}

export const analytics = new Analytics()
