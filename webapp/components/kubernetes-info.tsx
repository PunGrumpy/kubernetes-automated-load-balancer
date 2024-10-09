import { motion } from 'framer-motion'
import { Box, Clock, Cpu, HardDrive, Server, Users } from 'lucide-react'

import { KubernetesData } from '@/types'

import { InfoItem } from './info-item'

interface KubernetesInfoProps {
  data: KubernetesData | null
  loading: boolean
}

export function KubernetesInfo({ data, loading }: KubernetesInfoProps) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <InfoItem
        icon={Server}
        label="Pod Name"
        value={data?.podName}
        loading={loading}
        subValue="Kubernetes Pod Identifier"
      />
      <InfoItem
        icon={Cpu}
        label="CPU Usage"
        value={`${data?.cpuUsage}%`}
        loading={loading}
        subValue="Average CPU load (1 minute)"
      />
      <InfoItem
        icon={HardDrive}
        label="Memory Usage"
        value={`${data?.memoryUsage?.percentage}%`}
        loading={loading}
        subValue={`${data?.memoryUsage?.used} / ${data?.memoryUsage?.total}`}
      />
      <InfoItem
        icon={Users}
        label="Total Visitors"
        value={data?.visitorCount}
        loading={loading}
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
        loading={loading}
        subValue="Current server timestamp"
      />
      <InfoItem
        icon={Box}
        label="OS Info"
        value={`${data?.osInfo?.platform} ${data?.osInfo?.release}`}
        loading={loading}
        subValue={`Uptime: ${data?.osInfo?.uptime}`}
      />
    </motion.div>
  )
}
