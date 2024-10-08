import { motion } from 'framer-motion'

type InfoItemProps = {
  icon: React.ElementType
  label: string
  value: string | number | null
  loading: boolean
}

const LoadingPlaceholder = () => (
  <motion.div
    className="h-4 w-20 rounded bg-primary/20"
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
  />
)

export function InfoItem({ icon: Icon, label, value, loading }: InfoItemProps) {
  return (
    <motion.div
      className="flex items-center justify-between space-x-4 rounded-lg bg-secondary/10 p-3 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <Icon className="size-5 text-primary" />
        <span className="font-medium">{label}</span>
      </div>
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <motion.span
          className="font-bold text-primary"
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
