# Use official Node.js 20 image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Build the app
RUN yarn build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"] 