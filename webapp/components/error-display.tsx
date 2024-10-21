import { motion } from 'framer-motion'
import { AlertTriangle, XCircle } from 'lucide-react'

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
        <AlertTriangle className="size-5" aria-hidden="true" />
        <p className="font-semibold">Error</p>
      </div>
      <p className="mt-2">{message}</p>
      <button
        className="mt-4 inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => window.location.reload()}
      >
        <XCircle className="mr-2 size-4" aria-hidden="true" />
        Retry
      </button>
    </motion.div>
  )
}
