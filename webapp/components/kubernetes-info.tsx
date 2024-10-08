import { motion } from 'framer-motion'
import { Box, Clock, Cpu, Network, Server, Users } from 'lucide-react'

import { KubernetesData } from '@/types'

import { InfoItem } from './info-item'

interface KubernetesInfoProps {
  data: KubernetesData | null
  loading: boolean
}

export function KubernetesInfo({ data, loading }: KubernetesInfoProps) {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <InfoItem
        icon={Server}
        label="Pod Name"
        value={data?.podName}
        loading={loading}
      />
      <InfoItem
        icon={Cpu}
        label="CPU Usage"
        value={data?.cpuUsage}
        loading={loading}
      />
      <InfoItem
        icon={Users}
        label="Total Visitors"
        value={data?.visitorCount}
        loading={loading}
      />
      <InfoItem
        icon={Clock}
        label="Server Time"
        value={
          data?.serverTime
            ? new Date(data.serverTime).toLocaleString()
            : undefined
        }
        loading={loading}
      />
    </motion.div>
  )
}
