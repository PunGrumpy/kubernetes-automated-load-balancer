import { useMemo } from 'react'

interface VisitorsData {
  date: string
  visitors: number
}

export const useVisitorsData = (timeseriesPageviews: any[]) => {
  const data: VisitorsData[] = useMemo(() => {
    return timeseriesPageviews.map(day => ({
      date: day.date,
      visitors: day.events.reduce(
        (acc: number, curr: any) => acc + Number(Object.values(curr)[0]!),
        0
      )
    }))
  }, [timeseriesPageviews])

  const maxVisitors = useMemo(
    () => Math.max(...data.map(item => item.visitors), 1),
    [data]
  )
  const totalVisitors = useMemo(
    () => data.reduce((acc, curr) => acc + curr.visitors, 0),
    [data]
  )
  const avgVisitorsPerDay = useMemo(
    () => (totalVisitors / data.length).toFixed(1),
    [totalVisitors, data]
  )

  return {
    data,
    maxVisitors,
    totalVisitors,
    avgVisitorsPerDay
  }
}
