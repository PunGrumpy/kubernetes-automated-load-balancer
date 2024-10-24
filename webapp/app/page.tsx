'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { AnalyticsDashboard } from '@/components/analytics/dashboard'
import { ErrorDisplay } from '@/components/error-display'
import { Skeleton } from '@/components/ui/skeleton'
import { fetcher } from '@/lib/fetch'
import { TimeSeriesRequest } from '@/types'

interface AnalyticsData {
  timeseriesRequests: TimeSeriesRequest[]
}

export default function Page() {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  const { data, error, isLoading } = useSWR<AnalyticsData>(
    !isAuthenticating ? '/api/visitor' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  )

  useEffect(() => {
    const authenticate = async () => {
      try {
        await fetcher('/api/auth')
      } catch (error) {
        setAuthError(
          error instanceof Error ? error.message : 'Authentication failed'
        )
        console.error('Authentication error:', error)
      } finally {
        setIsAuthenticating(false)
      }
    }

    authenticate()
  }, [])

  if (authError) {
    return <ErrorDisplay message={authError} />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row flex-wrap items-center justify-center gap-14 rounded-3xl p-14"
    >
      <main className="mx-auto w-full max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          API Request Analytics Dashboard
        </h1>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : data ? (
          <AnalyticsDashboard timeseriesRequests={data.timeseriesRequests} />
        ) : null}
        {error && <ErrorDisplay message={error.message} />}
      </main>
    </motion.div>
  )
}
