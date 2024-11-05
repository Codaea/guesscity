# Build stage
ARG NODE_VERSION=21.10.0
FROM node:${NODE_VERSION}-slim as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-slim

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output /app
COPY --from=builder /app/package*.json /app/

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Start the server
CMD ["node", "/app/server/index.mjs"]
