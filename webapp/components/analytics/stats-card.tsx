import { motion } from 'framer-motion'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

export function StatCard({
  title,
  value,
  icon,
  trend,
  description
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <motion.div
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.div>
        {trend && (
          <motion.div
            className="mt-2 flex items-center text-xs text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {trend.value >= 0 ? (
              <TrendingUpIcon className="mr-1 size-4 text-green-500" />
            ) : (
              <TrendingDownIcon className="mr-1 size-4 text-red-500" />
            )}
            <span
              className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}
            >
              {trend.value}% {trend.label}
            </span>
          </motion.div>
        )}
        {description && (
          <motion.p
            className="mt-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </CardContent>
    </Card>
  )
}
