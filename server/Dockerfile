# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port your Express server uses
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "dev"]
