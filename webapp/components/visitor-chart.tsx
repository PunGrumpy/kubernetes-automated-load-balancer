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

interface VisitorsChartProps {
  data: {
    date: string
    visitors: number
  }[]
}

export function VisitorsChart({ data }: VisitorsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visitors Overview</CardTitle>
        <CardDescription>Daily visitor count for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: 'Visitors',
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
              // 12/10/2024 -> 12 Oct
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
            <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
