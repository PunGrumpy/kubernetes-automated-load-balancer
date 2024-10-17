'use client'

import { AlertCircle } from 'lucide-react'
import useSWR from 'swr'

import AnalyticsDashboard from '@/components/analytics/dashboard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { fetchWrapper } from '@/lib/fetch-wrapper'
import { AnalyticsData } from '@/types'

export default function Page() {
  const { data, error, mutate } = useSWR<AnalyticsData>(
    '/api/visitor',
    fetchWrapper,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  )

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="mb-8 text-center text-4xl font-bold">
          API Analytics Dashboard
        </h1>
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load analytics data.
            <Button variant="link" onClick={() => mutate()}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">
        API Analytics Dashboard
      </h1>
      <AnalyticsDashboard
        timeseriesRequests={data?.timeseriesRequests}
        topCountries={data?.topCountries}
      />
    </div>
  )
}
