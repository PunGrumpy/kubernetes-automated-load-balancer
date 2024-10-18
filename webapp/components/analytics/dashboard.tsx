'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { BarChartIcon } from 'lucide-react'
import { useState } from 'react'

import { RequestsChart } from '@/components/analytics/requests-chart'
import { StatCard } from '@/components/analytics/stats-card'
import { TopCountriesCard } from '@/components/analytics/top-countries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TimeSeriesRequest, TopCountry } from '@/types'

interface AnalyticsDashboardProps {
  timeseriesRequests: TimeSeriesRequest[]
  topCountries: TopCountry[]
}

export function AnalyticsDashboard({
  timeseriesRequests,
  topCountries
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const totalRequests = timeseriesRequests.reduce(
    (sum, day) =>
      sum +
      day.events.reduce((daySum, event) => daySum + Object.values(event)[0], 0),
    0
  )

  const avgRequestsPerDay = (totalRequests / timeseriesRequests.length).toFixed(
    2
  )

  const data = timeseriesRequests.map(day => ({
    date: day.date,
    requests: day.events.reduce(
      (sum, event) => sum + Object.values(event)[0],
      0
    )
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
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
        <TabsTrigger value="countries">Top Countries</TabsTrigger>
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2"
            >
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Total API Requests"
                  value={totalRequests}
                  icon={
                    <BarChartIcon className="size-4 text-muted-foreground" />
                  }
                  description="Over the last 7 days"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Avg. Requests/Day"
                  value={avgRequestsPerDay}
                  icon={
                    <BarChartIcon className="size-4 text-muted-foreground" />
                  }
                  description="Over the last 7 days"
                />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <RequestsChart data={data} />
            </motion.div>
          </TabsContent>
          <TabsContent value="countries" className="space-y-6">
            <TopCountriesCard
              topCountries={topCountries}
              totalRequests={totalRequests}
            />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
