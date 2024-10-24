'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <h1 className="mb-4 text-3xl font-bold">Something went wrong!</h1>
          <button
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
