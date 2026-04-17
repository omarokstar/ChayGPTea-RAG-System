# Use an official Node.js runtime as a parent image, using the 'slim' variant for a smaller size
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the backend application code
COPY . .

# Expose the port the app runs on (Render automatically provides a PORT env variable)
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
