#!/bin/bash

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Not in a git repository. Please run this script from a git repository."
    exit 1
fi

# Get the current branch name
BRANCH=$(git symbolic-ref --short HEAD)

# Add all changes
git add .

# Check if there are any changes to commit
if git diff --cached --quiet; then
    echo "No changes to commit."
    exit 0
fi

# Get the commit message from the first argument or use a default
COMMIT_MSG=${1:-"Update: $(date +'%Y-%m-%d %H:%M:%S')"}

# Commit the changes
git commit -m "$COMMIT_MSG"

# Push to the remote repository
git push origin "$BRANCH"

echo "Changes pushed to GitHub successfully!" 