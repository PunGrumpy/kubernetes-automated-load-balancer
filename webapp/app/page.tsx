import AnalyticsDashboard from '@/components/analytics-dashboard'
import { analytics } from '@/lib/analytics'

export default async function Page() {
  const TRACKING_DAYS = 7

  const pageviews = await analytics.retrieveLastDays('pageview', TRACKING_DAYS)

  const topCountriesMap = new Map<string, number>()

  for (const day of pageviews) {
    for (const event of day.events) {
      const key = Object.keys(event)[0]!
      const value = Object.values(event)[0]!
      const parsedKey = JSON.parse(key)
      const country = parsedKey?.country

      if (country) {
        topCountriesMap.set(
          country,
          (topCountriesMap.get(country) || 0) + value
        )
      }
    }
  }

  const topCountries = Array.from(topCountriesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Analytics Dashboard
      </h1>
      <AnalyticsDashboard
        timeseriesPageviews={pageviews}
        topCountries={topCountries}
      />
    </div>
  )
}
