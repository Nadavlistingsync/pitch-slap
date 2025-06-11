#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running code checks...${NC}"

# Run TypeScript type checking
echo -e "\n${YELLOW}Running TypeScript type checking...${NC}"
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}TypeScript type checking failed!${NC}"
    exit 1
fi

# Run ESLint
echo -e "\n${YELLOW}Running ESLint...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}ESLint check failed!${NC}"
    exit 1
fi

# Run tests
echo -e "\n${YELLOW}Running tests...${NC}"
npm test
if [ $? -ne 0 ]; then
    echo -e "${RED}Tests failed!${NC}"
    exit 1
fi

# Build the project
echo -e "\n${YELLOW}Building the project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

echo -e "\n${GREEN}All checks passed!${NC}"

# If all checks pass, commit and push to GitHub
if [ "$1" == "--push" ]; then
    echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
    git add .
    git commit -m "chore: automatic update with passing checks"
    git push
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to push to GitHub!${NC}"
        exit 1
    fi
    echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
fi 