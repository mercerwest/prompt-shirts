#!/bin/bash

# Prompt Shirts Deployment Script
# This script deploys the app to your EC2 instance

set -e

echo "🚀 Starting Prompt Shirts deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t prompt-shirts .

# Stop existing container if running
echo "🛑 Stopping existing container..."
docker-compose down || true

# Start the new container
echo "▶️ Starting new container..."
docker-compose up -d

# Wait a moment for the container to start
sleep 5

# Check if the container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app should be available at: http://localhost:3000"
    echo "📊 Container status:"
    docker-compose ps
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi 