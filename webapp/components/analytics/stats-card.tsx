import { TrendingUpIcon } from 'lucide-react'

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
    <Card className="transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <TrendingUpIcon
              className={`mr-1 size-4 ${trend.value >= 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}
            >
              {trend.value}% {trend.label}
            </span>
          </div>
        )}
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
