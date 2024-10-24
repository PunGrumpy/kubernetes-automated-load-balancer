export interface TimeSeriesRequest {
  date: string
  events: Record<string, number>[]
}

export interface AuthRequest {
  publicToken: string
  timestamp: number
  signature: string
}

export interface SessionData {
  isLoggedIn: boolean
  sessionToken?: string
}

export interface DeviceData {
  browser: string
  isBot: boolean
}
