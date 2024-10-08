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
        subValue={data?.podIp}
        loading={loading}
      />
      <InfoItem
        icon={Cpu}
        label="Node Name"
        value={data?.nodeName}
        subValue={data?.nodeIp}
        loading={loading}
      />
      <InfoItem
        icon={Box}
        label="Namespace"
        value={data?.namespace}
        loading={loading}
      />
      <InfoItem
        icon={Network}
        label="Kubernetes Version"
        value={data?.kubernetesVersion}
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
