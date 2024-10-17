'use client'

import { motion } from 'framer-motion'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChartIcon,
  GlobeIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VisitorsChart } from '@/components/visitor-chart'
import { useVisitorsData } from '@/hooks/useVisitorsData'

interface AnalyticsDashboardProps {
  timeseriesPageviews: any[]
  topCountries: [string, number][]
}

export default function AnalyticsDashboard({
  timeseriesPageviews,
  topCountries
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const { data, maxVisitors, totalVisitors, avgVisitorsPerDay } =
    useVisitorsData(timeseriesPageviews)

  const amtVisitorsToday = data[data.length - 1]?.visitors || 0
  const percentageChange = (
    (amtVisitorsToday / Number(avgVisitorsPerDay) - 1) *
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
            title="Total Visitors Today"
            value={amtVisitorsToday}
            icon={<UsersIcon className="size-4 text-muted-foreground" />}
            trend={{
              value: Number(percentageChange),
              label: 'from average'
            }}
          />
          <StatCard
            title="Avg. Visitors/Day"
            value={avgVisitorsPerDay}
            icon={<BarChartIcon className="size-4 text-muted-foreground" />}
            description="Over the last 7 days"
          />
        </div>
        <VisitorsChart data={data} />
        <TopCountriesCard
          topCountries={topCountries}
          totalVisitors={totalVisitors}
        />
      </TabsContent>
      <TabsContent value="analytics" className="space-y-6">
        <VisitorsChart data={data} />
        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            title="Highest Traffic"
            value={maxVisitors}
            icon={<ArrowUpIcon className="size-4 text-muted-foreground" />}
            description="visitors on peak day"
          />
          <StatCard
            title="Lowest Traffic"
            value={Math.min(...data.map(d => d.visitors))}
            icon={<ArrowDownIcon className="size-4 text-muted-foreground" />}
            description="visitors on slowest day"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
  }
  description?: string
}

function StatCard({ title, value, icon, trend, description }: StatCardProps) {
  return (
    <Card className="transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <TrendingUpIcon
              className={`mr-1 size-4 ${trend.value >= 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}
            >
              {trend.value}% {trend.label}
            </span>
          </div>
        )}
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface TopCountriesCardProps {
  topCountries: [string, number][]
  totalVisitors: number
}

function TopCountriesCard({
  topCountries,
  totalVisitors
}: TopCountriesCardProps) {
  return (
    <Card className="transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
        <CardDescription>Top 5 countries by visitor count</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4">
          {topCountries.map(([countryCode, number], index) => (
            <motion.div
              key={countryCode}
              className="flex items-center rounded-md p-2 transition-all duration-200 hover:bg-accent/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {countryCode !== 'Unknown' ? (
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
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
              <div className="font-medium">
                {((number / totalVisitors) * 100).toFixed(1)}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}