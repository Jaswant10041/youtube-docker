# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the environment file
COPY .env ./

# Expose the port that the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]