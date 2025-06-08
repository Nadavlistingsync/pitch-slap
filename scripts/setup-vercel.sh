#!/bin/bash

# Remove existing .vercel directory if it exists
rm -rf .vercel

# Create a new .vercel directory
mkdir -p .vercel

# Create project.json with the necessary configuration
cat > .vercel/project.json << EOL
{
  "projectId": "${VERCEL_PROJECT_ID}",
  "orgId": "${VERCEL_ORG_ID}",
  "settings": {
    "framework": "nextjs",
    "buildCommand": "npm run build",
    "devCommand": "npm run dev",
    "installCommand": "npm install"
  }
}
EOL

# Create .gitignore entry for .vercel
echo ".vercel" >> .gitignore

# Make the script executable
chmod +x scripts/setup-vercel.sh 