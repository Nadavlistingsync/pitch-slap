#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running code quality checks...${NC}"

# Run ESLint
echo -e "\n${YELLOW}Running ESLint...${NC}"
npm run lint
if [ $? -eq 0 ]; then
    echo -e "${GREEN}ESLint passed!${NC}"
else
    echo -e "${RED}ESLint failed!${NC}"
    exit 1
fi

# Run TypeScript type checking
echo -e "\n${YELLOW}Running TypeScript type checking...${NC}"
npm run type-check
if [ $? -eq 0 ]; then
    echo -e "${GREEN}TypeScript type checking passed!${NC}"
else
    echo -e "${RED}TypeScript type checking failed!${NC}"
    exit 1
fi

# Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
    echo -e "\n${YELLOW}Running tests...${NC}"
    npm test
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Tests passed!${NC}"
    else
        echo -e "${RED}Tests failed!${NC}"
        exit 1
    fi
fi

echo -e "\n${GREEN}All checks passed!${NC}" 