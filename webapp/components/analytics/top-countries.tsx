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

const MotionCard = motion.create(Card)

export function TopCountriesCard({
  topCountries,
  totalRequests
}: TopCountriesCardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <MotionCard
      className="transition-all duration-200 hover:bg-accent/5 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
        <CardDescription>Top 5 countries by request count</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {topCountries.map(([countryCode, number], index) => (
            <motion.div
              key={countryCode}
              className="flex items-center rounded-md p-2 transition-all duration-200 hover:bg-accent/10"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <motion.div
                className="font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {((number / totalRequests) * 100).toFixed(1)}%
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </MotionCard>
  )
}
