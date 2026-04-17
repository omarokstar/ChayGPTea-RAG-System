# Use Node.js for frontend
FROM node:20-slim

WORKDIR /app

# Copy dependencies first to use caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Run the dev server and explicitly bind to all network interfaces so it's accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]
