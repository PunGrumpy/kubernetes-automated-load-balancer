'use client'

import { motion } from 'framer-motion'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

import { StatCard } from './stats-card'

interface ApiUsageData {
  date: string
  requests: number
}

interface ApiUsageInsightsProps {
  data: ApiUsageData[]
}

function calculateTrend(data: ApiUsageData[]): string {
  const lastWeek = data.slice(-7)
  const lastWeekTotal = lastWeek.reduce((acc, curr) => acc + curr.requests, 0)
  const lastWeekAverage = lastWeekTotal / lastWeek.length
  const percentageChange = (
    ((data[data.length - 1].requests - lastWeekAverage) / lastWeekAverage) *
    100
  ).toFixed(2)
  return percentageChange
}

export function ApiUsageInsights({ data }: ApiUsageInsightsProps) {
  const trend = calculateTrend(data)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <StatCard
            title="Trend Analysis"
            value={trend}
            icon={
              parseFloat(trend) >= 0 ? (
                <TrendingUpIcon className="size-4 text-green-500" />
              ) : (
                <TrendingDownIcon className="size-4 text-red-500" />
              )
            }
            trend={{
              value: parseFloat(trend),
              label: 'over the past two weeks'
            }}
          />
          <Card className="w-full transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
            <CardHeader>
              <CardTitle>Trend Overview</CardTitle>
              <CardDescription>
                A detailed overview of the trend analysis for the 1 week
              </CardDescription>
            </CardHeader>
            <ChartContainer
              config={{
                requests: {
                  label: 'Requests',
                  color: '#2563eb'
                }
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorRequests"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-requests)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-requests)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={date =>
                      new Date(date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short'
                      })
                    }
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={value => `${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="var(--color-requests)"
                    fillOpacity={1}
                    fill="url(#colorRequests)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>
      </motion.div>
    </>
  )
}
