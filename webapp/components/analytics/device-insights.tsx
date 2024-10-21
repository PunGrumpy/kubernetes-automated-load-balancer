import { TrendingUp } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis
} from 'recharts'

import { BotsCard } from '@/components/analytics/bots-card'
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

interface DeviceData {
  browsers: { [key: string]: number }
  bots: number
  total: number
}

interface DeviceInsightsProps {
  deviceData: DeviceData
}

export function DeviceInsights({ deviceData }: DeviceInsightsProps) {
  const browserData = Object.entries(deviceData.browsers)
    .map(([browser, visitors]) => ({ browser, visitors }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5)

  const chartData = browserData.map((item, index) => ({
    ...item,
    fill: `var(--color-${item.browser.toLowerCase()})`
  }))

  const totalVisitors = chartData.reduce((sum, item) => sum + item.visitors, 0)

  const chartConfig = {
    visitors: {
      label: 'Visitors'
    },
    ...chartData.reduce((acc, { browser }, index) => {
      acc[browser.toLowerCase()] = {
        label: browser,
        color: `hsl(var(--chart-${index + 1}))`
      }
      return acc
    }, {} as ChartConfig)
  }

  return (
    <div className="space-y-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Browser Distribution</CardTitle>
          <CardDescription>Top 5 browsers by usage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-full max-w-5xl"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  fontSize={12}
                  tickMargin={10}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
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
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Most popular is {chartData[0].browser} (
            {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}%)
            <TrendingUp className="size-4" aria-hidden="true" />
          </div>
          <div className="leading-none text-muted-foreground">
            Based on {totalVisitors.toLocaleString()} total visitors
          </div>
        </CardFooter>
      </Card>

      <BotsCard bots={deviceData.bots} total={deviceData.total} />
    </div>
  )
}
