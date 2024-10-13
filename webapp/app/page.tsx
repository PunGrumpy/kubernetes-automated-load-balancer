'use client'

import { motion } from 'framer-motion'
import {
  Box,
  Clock,
  Cpu,
  HardDrive,
  RefreshCw,
  Server,
  Users
} from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'

import { ErrorDisplay } from '@/components/error-display'
import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { fetchWrapper } from '@/lib/fetch-wrapper'
import { KubernetesData } from '@/types'

export default function Page() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data, error, isLoading, mutate } = useSWR<KubernetesData>(
    '/api/info',
    fetchWrapper,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await mutate()
    setIsRefreshing(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Kubernetes Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Monitor your cluster&apos;s performance and stats
          </p>
        </header>

        <main>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={Server}
              label="Pod Name"
              value={data?.podName}
              loading={isLoading}
              subValue="Kubernetes Pod Identifier"
            />
            <InfoItem
              icon={Cpu}
              label="CPU Usage"
              value={`${data?.cpuUsage}%`}
              loading={isLoading}
              subValue="Average CPU load (1 minute)"
            />
            <InfoItem
              icon={HardDrive}
              label="Memory Usage"
              value={`${data?.memoryUsage?.percentage}%`}
              loading={isLoading}
              subValue={`${data?.memoryUsage?.used} / ${data?.memoryUsage?.total}`}
            />
            <InfoItem
              icon={Users}
              label="Total Visitors"
              value={data?.visitorCount}
              loading={isLoading}
              subValue="Number of API requests"
            />
            <InfoItem
              icon={Clock}
              label="Server Time"
              value={
                data?.serverTime
                  ? new Date(data.serverTime).toLocaleString()
                  : undefined
              }
              loading={isLoading}
              subValue="Current server timestamp"
            />
            <InfoItem
              icon={Box}
              label="OS Info"
              value={`${data?.osInfo?.platform} ${data?.osInfo?.release}`}
              loading={isLoading}
              subValue={`Uptime: ${data?.osInfo?.uptime}`}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleRefresh}
              disabled={isLoading || isRefreshing}
              size="lg"
            >
              <RefreshCw
                className={`mr-2 size-5 ${isRefreshing ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>
                {isLoading || isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </span>
            </Button>
          </div>

          {error && (
            <ErrorDisplay message={error?.message ?? 'An error occurred'} />
          )}
        </main>
      </div>
    </main>
  )
}
