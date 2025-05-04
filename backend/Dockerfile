# Base image - using Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
# Note: Don't put sensitive information like MongoDB URLs in the Dockerfile
# Use docker-compose or kubernetes secrets for that

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]