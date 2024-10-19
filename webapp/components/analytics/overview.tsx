import { ActivityIcon, BarChartIcon, LineChartIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts'

import { StatCard } from '@/components/analytics/stats-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
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
  maxRequests: number
}

export function Overview({
  data,
  totalRequests,
  avgRequestsPerDay,
  maxRequests
}: OverviewProps) {
  const chartConfig = {
    requests: {
      label: 'Requests',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig

  return (
    <main className="space-y-6">
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
        <Card>
          <CardHeader>
            <CardTitle>Requests Overview</CardTitle>
            <CardDescription>
              Daily API request count for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] w-full max-w-5xl"
            >
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickMargin={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={date =>
                    new Date(date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={date =>
                        new Date(date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                      }
                    />
                  }
                  filterNull
                />
                <Bar
                  dataKey="requests"
                  fill="var(--color-requests)"
                  strokeWidth={2}
                  radius={8}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.fill}
                      />
                    )
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Most requests is {maxRequests} (
              {((maxRequests / totalRequests) * 100).toFixed(1)}%)
              <ActivityIcon className="size-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Based on total in the last 7 days
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
