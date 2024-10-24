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

# Build with secrets
RUN --mount=type=secret,id=UPSTASH_REDIS_REST_URL,env=UPSTASH_REDIS_REST_URL \
    --mount=type=secret,id=UPSTASH_REDIS_REST_TOKEN,env=UPSTASH_REDIS_REST_TOKEN \
    --mount=type=secret,id=NEXT_PUBLIC_METADATA_BASE,env=NEXT_PUBLIC_METADATA_BASE \
    --mount=type=secret,id=AUTH_API_KEY,env=AUTH_API_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_AUTH_API_KEY,env=NEXT_PUBLIC_AUTH_API_KEY \
    bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Update and upgrade packages to fix vulnerabilities
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    e2fsprogs=1.46.2-2+deb11u1 \
    libcom-err2=1.46.2-2+deb11u1 \
    libext2fs2=1.46.2-2+deb11u1 \
    libss2=1.46.2-2+deb11u1 \
    logsave=1.46.2-2+deb11u1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

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