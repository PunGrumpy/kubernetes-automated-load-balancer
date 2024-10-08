# Use the official Bun image
FROM oven/bun:1 AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS dependencies
COPY package.json bun.lockb ./
RUN bun install

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

EXPOSE 3000

# Start the app
CMD ["bun", "server.js"]