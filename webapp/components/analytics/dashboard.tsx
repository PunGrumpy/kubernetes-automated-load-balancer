'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { DeviceInsights } from '@/components/analytics/device-insights'
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
  const { data, totalRequests, avgRequestsPerDay, maxRequests, deviceData } =
    useRequestsData(timeseriesRequests)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="mx-auto w-full max-w-5xl"
    >
      <TabsList className="mb-8 grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsContent value="overview" className="space-y-6">
            <Overview
              data={data}
              totalRequests={totalRequests}
              avgRequestsPerDay={avgRequestsPerDay}
              maxRequests={maxRequests}
            />
          </TabsContent>
          <TabsContent value="insights" className="space-y-6">
            <DeviceInsights deviceData={deviceData} />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
