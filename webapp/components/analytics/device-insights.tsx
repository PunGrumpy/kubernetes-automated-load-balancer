import { BotIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import { Badge } from '@/components/ui/badge'
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

  const botPercentage = (deviceData.bots / deviceData.total) * 100
  const isBotTrafficHigh = botPercentage > 5 // Assuming 5% as a threshold

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Browser Distribution</CardTitle>
          <CardDescription>Top 5 browsers by usage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-full max-w-5xl"
          >
            <BarChart accessibilityLayer data={chartData}>
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
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Most popular is {chartData[0].browser} (
            {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}%)
            <TrendingUp className="size-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Based on {totalVisitors} total visitors
          </div>
        </CardFooter>
      </Card>

      <Card
        className={
          isBotTrafficHigh ? 'border border-destructive bg-destructive/5' : ''
        }
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Bot Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-2xl font-semibold">{deviceData.bots}</p>
                <p className="text-sm text-muted-foreground">Bot Requests</p>
              </div>
            </div>
            <Badge variant={isBotTrafficHigh ? 'destructive' : 'secondary'}>
              {botPercentage.toFixed(2)}% of total traffic
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {isBotTrafficHigh ? 'High bot traffic' : 'Normal bot traffic'}
            {isBotTrafficHigh ? (
              <TrendingUp className="size-4 text-[#f44336]" />
            ) : (
              <TrendingDown className="size-4 text-[#4caf50]" />
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Based on {deviceData.total} total requests
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
