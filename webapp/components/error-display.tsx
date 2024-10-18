import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface ErrorDisplayProps {
  message: string
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <motion.div
      className="mx-auto mt-6 w-full max-w-5xl rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      role="alert"
    >
      <div className="flex items-center justify-center space-x-2">
        <AlertTriangle className="size-5" />
        <p className="font-semibold">Error</p>
      </div>
      <p className="mt-2">{message}</p>
    </motion.div>
  )
}
