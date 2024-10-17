'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChartIcon,
  GlobeIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VisitorsChart } from '@/components/visitor-chart'
import { useVisitorsData } from '@/hooks/useVisitorsData'

const MotionCard = motion(Card)

interface AnalyticsDashboardProps {
  timeseriesPageviews: any[] // Replace 'any' with a more specific type
  topCountries: [string, number][]
}

export default function AnalyticsDashboard({
  timeseriesPageviews,
  topCountries
}: AnalyticsDashboardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { data, maxVisitors, totalVisitors, avgVisitorsPerDay } =
    useVisitorsData(timeseriesPageviews)

  const amtVisitorsToday = data[data.length - 1]?.visitors || 0
  const percentageChange = (
    (amtVisitorsToday / Number(avgVisitorsPerDay) - 1) *
    100
  ).toFixed(1)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Tabs defaultValue="overview" className="mx-auto w-full max-w-5xl">
      <TabsList className="mb-8 grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait">
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MotionCard
              className="transition-shadow duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Visitors Today
                </CardTitle>
                <UsersIcon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <motion.div
                    className="text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {amtVisitorsToday}
                  </motion.div>
                )}
                {isLoading ? (
                  <Skeleton className="mt-2 h-4 w-[200px]" />
                ) : (
                  <motion.div
                    className="mt-2 flex items-center text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TrendingUpIcon
                      className={`mr-1 size-4 ${Number(percentageChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                    />
                    <span
                      className={
                        Number(percentageChange) >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {percentageChange}% from average
                    </span>
                  </motion.div>
                )}
              </CardContent>
            </MotionCard>
            <MotionCard
              className="transition-shadow duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Visitors/Day
                </CardTitle>
                <BarChartIcon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-[100px]" />
                ) : (
                  <motion.div
                    className="text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {avgVisitorsPerDay}
                  </motion.div>
                )}
                {isLoading ? (
                  <Skeleton className="mt-2 h-4 w-[150px]" />
                ) : (
                  <motion.p
                    className="mt-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Over the last 7 days
                  </motion.p>
                )}
              </CardContent>
            </MotionCard>
          </motion.div>
          <MotionCard
            className="transition-shadow duration-200 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle>Visitors Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <VisitorsChart data={data} />
              )}
            </CardContent>
          </MotionCard>
          <MotionCard
            className="transition-shadow duration-200 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>
                Top 5 countries by visitor count
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="mr-2 size-4 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[60px]" />
                      </div>
                      <Skeleton className="ml-auto h-4 w-[50px]" />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div className="space-y-4">
                  {topCountries.map(([countryCode, number], index) => (
                    <motion.div
                      className="flex items-center"
                      key={countryCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {countryCode !== 'Unknown' ? (
                        <ReactCountryFlag
                          svg
                          countryCode={countryCode}
                          className="mr-2 size-4 rounded-full"
                        />
                      ) : (
                        <GlobeIcon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      <div className="ml-2 flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {countryCode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {number} visitors
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {((number / totalVisitors) * 100).toFixed(1)}%
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </MotionCard>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <MotionCard
            className="transition-shadow duration-200 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Visitors Over Time</CardTitle>
              <CardDescription>
                Daily visitor count for the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <VisitorsChart data={data} />
            </CardContent>
          </MotionCard>
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MotionCard
              className="transition-shadow duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Highest Traffic
                </CardTitle>
                <ArrowUpIcon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {maxVisitors}
                </motion.div>
                <motion.p
                  className="mt-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  visitors on peak day
                </motion.p>
              </CardContent>
            </MotionCard>
            <MotionCard
              className="transition-shadow duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lowest Traffic
                </CardTitle>
                <ArrowDownIcon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Math.min(...data.map(d => d.visitors))}
                </motion.div>
                <motion.p
                  className="mt-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  visitors on slowest day
                </motion.p>
              </CardContent>
            </MotionCard>
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  )
}
