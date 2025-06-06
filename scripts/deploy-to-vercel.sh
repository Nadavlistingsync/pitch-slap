#!/bin/bash

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Not in a git repository. Please run this script from a git repository."
    exit 1
fi

# Get the current branch name
BRANCH=$(git symbolic-ref --short HEAD)

# Only deploy from main branch
if [ "$BRANCH" != "main" ]; then
    echo "Not on main branch. Skipping deployment."
    exit 0
fi

# Build the project
echo "Building project..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment completed!" 