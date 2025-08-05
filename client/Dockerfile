# Use official Node.js image
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy entire frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "dev"]
