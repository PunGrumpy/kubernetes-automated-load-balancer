import { motion } from 'framer-motion'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { ChartContainer } from './ui/chart'

interface VisitorsChartProps {
  data: {
    date: string
    visitors: number
  }[]
}

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: '#4CAF50'
  },
  pageviews: {
    label: 'Pageviews',
    color: '#FF9800'
  }
}

const exampleData = [
  { date: '2021-09-01', visitors: 100 },
  { date: '2021-09-02', visitors: 200 },
  { date: '2021-09-03', visitors: 300 },
  { date: '2021-09-04', visitors: 400 },
  { date: '2021-09-05', visitors: 500 },
  { date: '2021-09-06', visitors: 600 },
  { date: '2021-09-07', visitors: 700 }
]

export function VisitorsChart({ data }: VisitorsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <ChartContainer config={chartConfig} id="visitors-chart">
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#888888" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickFormatter={value => new Date(value).toLocaleDateString()}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={value => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff'
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              labelFormatter={label => new Date(label).toLocaleDateString()}
              formatter={value => [`${value} visitors`, 'Visitors']}
            />
            <Bar
              dataKey="visitors"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer> */}

        {/* example */}
        <BarChart
          accessibilityLayer
          data={exampleData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <h1>{exampleData.length}</h1>
          <CartesianGrid strokeDasharray="3 3" stroke="#888888" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickFormatter={value => new Date(value).toLocaleDateString()}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickFormatter={value => `${value}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '4px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            labelFormatter={label => new Date(label).toLocaleDateString()}
            formatter={value => [`${value} visitors`, 'Visitors']}
          />
          <Bar
            dataKey="visitors"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ChartContainer>
    </motion.div>
  )
}
