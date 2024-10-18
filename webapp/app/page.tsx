'use client'

import useSWR from 'swr'

import { AnalyticsDashboard } from '@/components/analytics/dashboard'
import { ErrorDisplay } from '@/components/error-display'
import { fetchWrapper } from '@/lib/fetch-wrapper'
import { TimeSeriesRequest } from '@/types'

interface AnalyticsData {
  timeseriesRequests: TimeSeriesRequest[]
}

export default function Page() {
  const { data, error } = useSWR<AnalyticsData>('/api/visitor', fetchWrapper, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0
  })

  return (
    <div className="my-16 flex bg-gradient-to-br from-background to-secondary/20 p-4">
      <main className="mx-auto w-full max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          API Request Analytics Dashboard
        </h1>
        {data && (
          <AnalyticsDashboard timeseriesRequests={data.timeseriesRequests} />
        )}
        {error && <ErrorDisplay message={error.message} />}
      </main>
    </div>
  )
}
