'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Clock, RefreshCw, Server, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

import { InfoItem } from '@/components/info-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Data {
  podName: string
  visitorCount: number
  serverTime: string
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/info')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 text-foreground">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">
              Kubernetes Load Balanced App
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <InfoItem
                    icon={Server}
                    label="Pod Name"
                    value={data?.podName ?? null}
                    loading={loading}
                  />
                  <InfoItem
                    icon={Users}
                    label="Total Visitors"
                    value={data?.visitorCount ?? null}
                    loading={loading}
                  />
                  <InfoItem
                    icon={Clock}
                    label="Server Time"
                    value={
                      data?.serverTime
                        ? new Date(data.serverTime).toLocaleString()
                        : null
                    }
                    loading={loading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              onClick={fetchData}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              <RefreshCw className="mr-2 size-4" />
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
