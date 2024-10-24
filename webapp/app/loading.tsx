import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-14 rounded-3xl p-14">
      <main className="mx-auto w-full max-w-5xl">
        <Skeleton className="mx-auto mb-8 h-12 w-3/4" />
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </main>
    </div>
  )
}
