import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

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

interface RequestsChartProps {
  data: {
    date: string
    requests: number
  }[]
}

export function RequestsChart({ data }: RequestsChartProps) {
  return (
    <Card className="w-full">
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
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
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
            <Bar dataKey="requests" fill="var(--color-requests)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
