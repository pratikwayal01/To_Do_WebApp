# Use Node.js 18.16.0 as the base image
FROM node:18.16.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 (default for React development)
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]
