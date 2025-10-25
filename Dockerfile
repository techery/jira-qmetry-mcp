# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including dev dependencies for building)
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build the project
RUN pnpm build

# Install only production dependencies in a clean directory
RUN rm -rf node_modules && \
    pnpm install --prod --frozen-lockfile --prefer-offline --shamefully-hoist

# Production stage
FROM node:24-alpine

# Set production environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Copy production node_modules from builder (no installation needed!)
COPY --from=builder /app/node_modules ./node_modules

# Copy the built application from builder stage
COPY --from=builder /app/dist ./

# Set the entrypoint to run the application
ENTRYPOINT ["node", "main.js"]
