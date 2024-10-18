export interface TimeSeriesRequest {
  date: string
  events: Record<string, number>[]
}
