/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_METADATA_BASE: process.env.NEXT_PUBLIC_METADATA_BASE,
    NEXT_PUBLIC_AUTH_API_KEY: process.env.NEXT_PUBLIC_AUTH_API_KEY
  }
}

export default nextConfig
