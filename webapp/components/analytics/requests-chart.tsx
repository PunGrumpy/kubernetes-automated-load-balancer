import { motion } from 'framer-motion'
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

const MotionCard = motion(Card)

export function RequestsChart({ data }: RequestsChartProps) {
  return (
    <MotionCard
      className="w-full transition-all duration-200 hover:bg-accent/5 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
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
              <Bar dataKey="requests" fill="var(--color-requests)" radius={4}>
                {data.map((entry, index) => (
                  <motion.rect
                    key={`bar-${index}`}
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </MotionCard>
  )
}
