export interface TimeSeriesRequest {
  date: string
  events: Record<string, number>[]
}

export interface DeviceData {
  browser: string
  isBot: boolean
}
