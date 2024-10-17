import { motion } from 'framer-motion'
import { GlobeIcon } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface TopCountriesCardProps {
  topCountries: [string, number][]
  totalRequests: number
}

export function TopCountriesCard({
  topCountries,
  totalRequests
}: TopCountriesCardProps) {
  return (
    <Card className="transition-all duration-200 hover:bg-accent/5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
        <CardDescription>Top 5 countries by request count</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4">
          {topCountries.map(([countryCode, number], index) => (
            <motion.div
              key={countryCode}
              className="flex items-center rounded-md p-2 transition-all duration-200 hover:bg-accent/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {countryCode !== 'Unknown' ? (
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  className="mr-2 size-4 rounded-full"
                />
              ) : (
                <GlobeIcon className="mr-2 size-4 text-muted-foreground" />
              )}
              <div className="ml-2 flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {countryCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {number} requests
                </p>
              </div>
              <div className="font-medium">
                {((number / totalRequests) * 100).toFixed(1)}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
