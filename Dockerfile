# Use the official lightweight Bun image
FROM oven/bun:1 as base
WORKDIR /app

# Copy package management files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
