import { motion } from 'framer-motion'
import { BarChartIcon, LineChartIcon } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { StatCard } from '@/components/analytics/stats-card'
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

interface OverviewProps {
  data: {
    date: string
    requests: number
  }[]
  totalRequests: number
  avgRequestsPerDay: string
}

export function Overview({
  data,
  totalRequests,
  avgRequestsPerDay
}: OverviewProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="Total API Requests"
              value={totalRequests}
              icon={<BarChartIcon className="size-4 text-muted-foreground" />}
              description="Over the last 7 days"
            />
            <StatCard
              title="Avg. Requests/Day"
              value={avgRequestsPerDay}
              icon={<LineChartIcon className="size-4 text-muted-foreground" />}
              description="Over the last 7 days"
            />
          </div>
          <div>
            <Card className="w-full transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
              <CardHeader>
                <CardTitle>Requests Overview</CardTitle>
                <CardDescription>
                  Daily API request count for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    requests: {
                      label: 'Requests',
                      color: '#2563eb'
                    }
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid
                        vertical={false}
                        stroke="hsl(var(--border))"
                      />
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
                      <Bar
                        dataKey="requests"
                        fill="var(--color-requests)"
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  )
}
