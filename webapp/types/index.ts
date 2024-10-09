export interface KubernetesData {
  podName: string
  cpuUsage: number
  memoryUsage: {
    total: string
    used: string
    free: string
    percentage: number
  }
  visitorCount: number
  serverTime: string
  osInfo: {
    platform: string
    release: string
    uptime: string
  }
}
