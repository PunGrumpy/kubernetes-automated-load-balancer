import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_METADATA_BASE
    ? new URL(`${process.env.NEXT_PUBLIC_METADATA_BASE}`)
    : new URL('https://pungrumpy.xyz'),
  title: 'Kubernetes Load Balanced App',
  description: '🦦 A Next.js app running on Kubernetes with a load balancer',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'Kubernetes Load Balanced App',
    siteName: 'Kubernetes Load Balanced App',
    description: '🦦 A Next.js app running on Kubernetes with a load balancer',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        alt: 'Kubernetes Load Balanced App',
        width: 1600,
        height: 960
      }
    ]
  },
  twitter: {
    title: 'Kubernetes Load Balanced App',
    description: '🦦 A Next.js app running on Kubernetes with a load balancer',
    card: 'summary_large_image',
    site: '@pungrumpy',
    creator: '@pungrumpy',
    images: [
      {
        url: '/twitter-image.png',
        alt: 'Kubernetes Load Balanced App',
        width: 1600,
        height: 960
      }
    ]
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'min-h-screen scroll-smooth font-sans antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
