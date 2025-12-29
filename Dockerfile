# Stage 1: Build the Application
FROM node:22 AS build

WORKDIR /usr/src/app

# Copy package files and tsconfig
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including devDependencies for TypeScript)
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Create the Final Production Image
FROM node:22-slim

WORKDIR /usr/src/app

# Copy only production dependencies
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --only=production

# Copy the built application files
COPY --from=build /usr/src/app/dist ./dist

# Set port
ENV PORT=8080
EXPOSE 8080

# Run as non-root user for security
USER node

# Start the application
CMD ["node", "dist/index.js"]
