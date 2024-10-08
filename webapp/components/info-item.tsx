import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface InfoItemProps {
  icon: LucideIcon
  label: string
  value: string | number | null | undefined
  loading: boolean
  subValue?: string | null | undefined
}

export function InfoItem({
  icon: Icon,
  label,
  value,
  loading,
  subValue
}: InfoItemProps) {
  return (
    <motion.div
      className="flex items-center justify-between space-x-4 rounded-lg bg-card p-4 shadow-md transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <span className="font-medium text-foreground">{label}</span>
          {subValue && (
            <p className="text-sm text-muted-foreground">{subValue}</p>
          )}
        </div>
      </div>
      {loading ? (
        <motion.div
          className="h-6 w-24 rounded bg-primary/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      ) : (
        <motion.span
          className="text-lg font-bold text-primary"
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value ?? 'N/A'}
        </motion.span>
      )}
    </motion.div>
  )
}
