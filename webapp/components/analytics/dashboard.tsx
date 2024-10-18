'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { ApiUsageInsights } from '@/components/analytics/api-usage-insights'
import { Overview } from '@/components/analytics/overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRequestsData } from '@/hooks/useRequestsData'
import { TimeSeriesRequest } from '@/types'

interface AnalyticsDashboardProps {
  timeseriesRequests: TimeSeriesRequest[]
}

export function AnalyticsDashboard({
  timeseriesRequests
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const { data, totalRequests, avgRequestsPerDay } =
    useRequestsData(timeseriesRequests)

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="mx-auto w-full max-w-5xl"
    >
      <TabsList className="mb-8 grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="insights">API Insights</TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="overview" className="space-y-6">
            <Overview
              data={data}
              totalRequests={totalRequests}
              avgRequestsPerDay={avgRequestsPerDay}
            />
          </TabsContent>
          <TabsContent value="insights" className="space-y-6">
            <ApiUsageInsights data={data} />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
