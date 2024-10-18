export type TimeSeriesRequest = {
  date: string
  events: Record<string, number>[]
}

export type TopCountry = [string, number]

export interface AnalyticsData {
  timeseriesRequests: TimeSeriesRequest[]
  topCountries: TopCountry[]
}
