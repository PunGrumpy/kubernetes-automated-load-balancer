import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-4">
              <motion.div
                className="flex h-full flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-2 flex items-center">
                  <div className="mr-2 rounded-full bg-primary/10 p-2">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
                {loading ? (
                  <motion.div
                    className="mt-1 h-6 w-full rounded bg-primary/20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut'
                    }}
                  />
                ) : (
                  <motion.div
                    className="flex grow items-center"
                    key={value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="break-words text-2xl font-bold text-primary">
                      {value ?? 'N/A'}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{subValue || label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
