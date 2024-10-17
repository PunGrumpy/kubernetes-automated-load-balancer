export type TimeSeriesRequest = {
  date: string
  requests: number
}

export type TopCountry = [string, number]

export interface AnalyticsData {
  timeseriesRequests: TimeSeriesRequest[]
  topCountries: TopCountry[]
}
