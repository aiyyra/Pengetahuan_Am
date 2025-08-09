# Stage 1: Dependencies
# Use the latest LTS Node.js version (Node 22) as the base image.
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
# Use the same Node.js version for the builder stage
FROM node:22-alpine AS builder
WORKDIR /app

# FIX: Provide build-time environment variables to prevent build errors.
ARG DATABASE_URL="postgresql://dummy_user:dummy_password@dummy_host:5432/dummy_db"
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build


# Stage 3: Production Runner
# Use the same lightweight Node.js version for the final stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# FIX: Install `vips`, the system library required for Next.js Image Optimization.
# This must be run as root before switching to the non-root user.
RUN apk add --no-cache vips

# Create a non-root user for enhanced security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary production files from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy the data directory containing CSV files
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

# Switch to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# The command to start the application
CMD ["node", "server.js"]