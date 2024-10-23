import { redis } from '@/lib/db'
import { getDate } from '@/lib/utils'

interface AnalyticsEvent {
  [key: string]: number
}

interface DailyAnalytics {
  date: string
  events: AnalyticsEvent[]
}

export class Analytics {
  private retentionPeriod: number = 7 * 24 * 60 * 60 // 7 days

  async track(namespace: string, event: object = {}): Promise<void> {
    const key = `analytics::${namespace}::${getDate()}`

    try {
      await redis.hincrby(key, JSON.stringify(event), 1)
      await redis.expire(key, this.retentionPeriod)
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
      return results.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    } catch (error) {
      console.error('Error retrieving analytics:', error)
      return []
    }
  }

  private async retrieve(
    namespace: string,
    date: string
  ): Promise<DailyAnalytics> {
    try {
      const events = await redis.hgetall(`analytics::${namespace}::${date}`)

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
