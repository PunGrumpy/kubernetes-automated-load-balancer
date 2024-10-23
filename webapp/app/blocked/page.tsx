'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function BlockedPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Access Blocked</CardTitle>
          <CardDescription>
            You have exceeded the rate limit. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button
              className="w-full"
              onClick={() => window.location.replace('/')}
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
