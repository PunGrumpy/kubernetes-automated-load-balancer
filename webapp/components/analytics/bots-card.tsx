'use client'

import { BotIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface BotsCardProps {
  bots: number
  total: number
}

export function BotsCard({ bots, total }: BotsCardProps) {
  const botPercentage = (bots / total) * 100
  const isBotTrafficHigh = botPercentage > 5 // Assuming 5% as a threshold

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(botPercentage), 500)
    return () => clearTimeout(timer)
  }, [botPercentage])

  return (
    <div>
      <Card
        className={
          isBotTrafficHigh ? 'border border-destructive bg-destructive/5' : ''
        }
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bot Traffic</CardTitle>
          <BotIcon
            className={`size-4 ${isBotTrafficHigh ? 'text-destructive' : 'text-muted-foreground'}`}
          />
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {bots.toLocaleString()}
              </span>
              <span className="text-base font-semibold text-muted-foreground">
                {botPercentage.toFixed(2)}%
              </span>
            </div>
            <Progress
              value={progress}
              className={`h-2 ${isBotTrafficHigh ? '[&>div]:bg-destructive' : ''}`}
            />
            <p className="text-sm text-muted-foreground">
              of {total.toLocaleString()} total requests
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
