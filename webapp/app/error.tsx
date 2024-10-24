'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              We apologize for the inconvenience. Please try again later.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={reset}>Try again</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
