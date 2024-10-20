import { useMemo } from 'react'

import { DeviceData, TimeSeriesRequest } from '@/types'

export function useRequestsData(timeseriesRequests: TimeSeriesRequest[]) {
  const data = useMemo(() => {
    return timeseriesRequests.map(day => ({
      date: day.date,
      requests:
        day.events && Array.isArray(day.events)
          ? day.events.reduce(
              (sum, event) => sum + ((Object.values(event)[0] as number) || 0),
              0
            )
          : 0
    }))
  }, [timeseriesRequests])

  const totalRequests = useMemo(() => {
    return data.reduce((sum, day) => sum + day.requests, 0)
  }, [data])

  const maxRequests = useMemo(() => {
    return Math.max(...data.map(day => day.requests))
  }, [data])

  const avgRequestsPerDay = useMemo(() => {
    return (totalRequests / data.length).toFixed(2)
  }, [totalRequests, data])

  const deviceData = useMemo(() => {
    const browsers: Record<string, number> = {}
    const deviceTypes: Record<string, number> = {}
    let bots = 0
    let total = 0

    timeseriesRequests.forEach(day => {
      if (day.events && Array.isArray(day.events)) {
        day.events.forEach(event => {
          const eventKey = Object.keys(event)[0]
          if (eventKey) {
            const { browser, isBot } = JSON.parse(eventKey) as DeviceData
            const count = (Object.values(event)[0] as number) || 0

            const browserName = browser.includes('Safari') ? 'Safari' : browser

            browsers[browserName] = (browsers[browserName] || 0) + count
            if (isBot) bots += count
            total += count
          }
        })
      }
    })

    return { browsers, deviceTypes, bots, total }
  }, [timeseriesRequests])

  return { data, totalRequests, maxRequests, avgRequestsPerDay, deviceData }
}
