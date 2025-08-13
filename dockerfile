# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Copy package.json and lock file
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies using the appropriate package manager
RUN \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Provide build-time environment variables to prevent build errors
ARG DATABASE_URL="postgresql://dummy_user:dummy_password@dummy_host:5432/dummy_db"
ENV DATABASE_URL=$DATABASE_URL

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build


# Stage 3: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Install system dependencies
RUN apk add --no-cache vips netcat-openbsd postgresql-client

# Install drizzle-kit CLI globally
RUN npm install -g drizzle-kit

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary production files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/data ./data
COPY --from=builder --chown=nextjs:nodejs /app/src/middleware.ts ./src/middleware.ts


# ✅ Copy Drizzle migration files and config
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Switch to non-root
USER nextjs

# Expose port
EXPOSE 3000

# CMD runs DB wait, migrations, then starts the server
CMD sh -c "echo 'Waiting for DB to be ready on ${DATABASE_URL}...'; \
    until nc -z db 5432; do \
    echo 'Waiting for database connection...'; sleep 3; \
    done; \
    echo 'Running Drizzle migrations...'; \
    echo 'Current directory:' && pwd && ls -la; \
    echo 'DATABASE_URL:' && echo ${DATABASE_URL}; \
    npm run db:migrate; \
    echo 'Migration completed. Starting app...'; \
    node server.js"

