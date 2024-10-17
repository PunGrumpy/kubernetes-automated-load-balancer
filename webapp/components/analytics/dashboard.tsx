'use client'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChartIcon,
  ServerIcon
} from 'lucide-react'
import { useState } from 'react'

import { StatCard } from '@/components/analytics/stats-card'
import { TopCountriesCard } from '@/components/analytics/top-countries'
import { RequestsChart } from '@/components/requests-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRequestsData } from '@/hooks/useRequestsData'
import { TimeSeriesRequest, TopCountry } from '@/types'

interface AnalyticsDashboardProps {
  timeseriesRequests?: TimeSeriesRequest[]
  topCountries?: TopCountry[]
}

export default function AnalyticsDashboard({
  timeseriesRequests,
  topCountries
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const { data, maxRequests, totalRequests, avgRequestsPerDay } =
    useRequestsData(timeseriesRequests || [])

  const amtRequestsToday = data[data.length - 1]?.requests || 0
  const percentageChange = (
    (amtRequestsToday / Number(avgRequestsPerDay) - 1) *
    100
  ).toFixed(1)

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="mx-auto w-full max-w-5xl"
    >
      <TabsList className="mb-8 grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            title="Total API Requests Today"
            value={amtRequestsToday}
            icon={<ServerIcon className="size-4 text-muted-foreground" />}
            trend={{
              value: Number(percentageChange),
              label: 'from average'
            }}
          />
          <StatCard
            title="Avg. Requests/Day"
            value={avgRequestsPerDay}
            icon={<BarChartIcon className="size-4 text-muted-foreground" />}
            description="Over the last 7 days"
          />
        </div>
        <RequestsChart data={data} />
        {topCountries && (
          <TopCountriesCard
            topCountries={topCountries}
            totalRequests={totalRequests}
          />
        )}
      </TabsContent>
      <TabsContent value="analytics" className="space-y-6">
        <RequestsChart data={data} />
        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            title="Highest Traffic"
            value={maxRequests}
            icon={<ArrowUpIcon className="size-4 text-muted-foreground" />}
            description="requests on peak day"
          />
          <StatCard
            title="Lowest Traffic"
            value={Math.min(...data.map(d => d.requests))}
            icon={<ArrowDownIcon className="size-4 text-muted-foreground" />}
            description="requests on slowest day"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
