'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'

import { ErrorDisplay } from '@/components/error-display'
import { KubernetesInfo } from '@/components/kubernetes-info'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KubernetesData } from '@/types'
import { fetchWrapper } from '@/utils/fetch-wrapper'

export default function Page() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data, error, isLoading, mutate } = useSWR<KubernetesData>(
    'api/info',
    fetchWrapper
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await mutate()
    setIsRefreshing(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="overflow-hidden border-none shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-center text-3xl font-bold">
              Kubernetes Load Balanced App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <AnimatePresence mode="wait">
              {error ? (
                <ErrorDisplay message={error.message} />
              ) : (
                <KubernetesInfo data={data ?? null} loading={isLoading} />
              )}
            </AnimatePresence>
            <div className="flex justify-center">
              <Button
                onClick={handleRefresh}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading || isRefreshing}
                size="lg"
              >
                <RefreshCw className="mr-2 size-5" aria-hidden="true" />
                <span>
                  {isLoading || isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
