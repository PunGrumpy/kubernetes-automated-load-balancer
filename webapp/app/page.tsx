import AnalyticsDashboard from '@/components/analytics-dashboard'

export default async function Page() {
  const response = await fetch('http://localhost:3000/api/request', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch analytics data')
  }

  const { timeseriesRequests, topCountries } = await response.json()

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">
        API Analytics Dashboard
      </h1>
      <AnalyticsDashboard
        timeseriesRequests={timeseriesRequests}
        topCountries={topCountries}
      />
    </div>
  )
}
