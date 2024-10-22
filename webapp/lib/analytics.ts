import { redis } from '@/lib/db'
import { getDate } from '@/lib/utils'

interface AnalyticsEvent {
  [key: string]: number
}

interface DailyAnalytics {
  date: string
  events: AnalyticsEvent[]
  bots: number
}

export class Analytics {
  private retentionPeriod: number = 7 * 24 * 60 * 60 // 7 days
  private botBuffer: { [key: string]: number } = {}
  private botBufferThreshold: number = 10
  private localCache: { [key: string]: any } = {}
  private localCacheExpiry: number = 60 * 1000 // 1 minute

  async track(namespace: string, event: object = {}): Promise<void> {
    const key = `analytics::${namespace}::${getDate()}`

    try {
      await redis.hincrby(key, JSON.stringify(event), 1)
      await redis.expire(key, this.retentionPeriod)
    } catch (error) {
      console.error('Error tracking analytics:', error)
    }
  }

  async trackBot(): Promise<void> {
    const date = getDate()
    this.botBuffer[date] = (this.botBuffer[date] || 0) + 1

    if (this.botBuffer[date] >= this.botBufferThreshold) {
      await this.flushBotBuffer(date)
    }
  }

  private async flushBotBuffer(date: string): Promise<void> {
    const key = `analytics::bots::${date}`

    try {
      await redis.incrby(key, this.botBuffer[date])
      await redis.expire(key, this.retentionPeriod)
      this.botBuffer[date] = 0
    } catch (error) {
      console.error('Error flushing bot buffer:', error)
    }
  }

  async retrieveLastDays(
    namespace: string,
    days: number
  ): Promise<DailyAnalytics[]> {
    const cacheKey = `${namespace}:${days}`
    const cachedResult = this.getFromLocalCache(cacheKey)
    if (cachedResult) return cachedResult

    const retrievePromises = Array.from({ length: days }, (_, i) => {
      const date = getDate(i)
      return this.retrieve(namespace, date)
    })

    try {
      const results = await Promise.all(retrievePromises)
      const sortedResults = results.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      this.setInLocalCache(cacheKey, sortedResults)
      return sortedResults
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
      const bots = await this.getBotCount(date)

      return {
        date,
        events: Object.entries(events ?? {}).map(([key, value]) => ({
          [key]: Number(value)
        })),
        bots
      }
    } catch (error) {
      console.error('Error retrieving daily analytics:', error)
      return { date, events: [], bots: 0 }
    }
  }

  private async getBotCount(date: string): Promise<number> {
    const botKey = `analytics::bots::${date}`
    const count = await redis.get(botKey)
    return (
      (typeof count === 'string' ? parseInt(count, 10) : 0) +
      (this.botBuffer[date] || 0)
    )
  }

  private getFromLocalCache(key: string): any | null {
    const cached = this.localCache[key]
    if (cached && Date.now() - cached.timestamp < this.localCacheExpiry) {
      return cached.value
    }
    return null
  }

  private setInLocalCache(key: string, value: any): void {
    this.localCache[key] = {
      value,
      timestamp: Date.now()
    }
  }
}

export const analytics = new Analytics()
