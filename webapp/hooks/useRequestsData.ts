import { useMemo } from 'react'

import { TimeSeriesRequest } from '@/types'

export function useRequestsData(timeseriesRequests: TimeSeriesRequest[]) {
  const data = useMemo(() => {
    return timeseriesRequests.map(day => ({
      date: day.date,
      requests: day.events.reduce(
        (sum, event) => sum + Object.values(event)[0],
        0
      )
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

  return { data, totalRequests, maxRequests, avgRequestsPerDay }
}
