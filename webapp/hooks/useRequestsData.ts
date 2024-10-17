import { useMemo } from 'react'

interface RequestsData {
  date: string
  requests: number
}

export const useRequestsData = (timeseriesRequests: any[]) => {
  const data: RequestsData[] = useMemo(() => {
    return timeseriesRequests.map(day => ({
      date: day.date,
      requests: day.events.reduce(
        (acc: number, curr: any) => acc + Number(Object.values(curr)[0]!),
        0
      )
    }))
  }, [timeseriesRequests])

  const maxRequests = useMemo(
    () => Math.max(...data.map(item => item.requests), 1),
    [data]
  )
  const totalRequests = useMemo(
    () => data.reduce((acc, curr) => acc + curr.requests, 0),
    [data]
  )
  const avgRequestsPerDay = useMemo(
    () => (totalRequests / data.length).toFixed(1),
    [totalRequests, data]
  )

  return {
    data,
    maxRequests,
    totalRequests,
    avgRequestsPerDay
  }
}
