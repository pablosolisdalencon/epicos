#!/bin/bash
REPO_URL=$1
APP_NAME=$(basename $REPO_URL .git)
DEST_DIR="/opt/epicos/apps/$APP_NAME"

echo "Cloning $REPO_URL..."
git clone $REPO_URL $DEST_DIR

echo "Importing SQL if present..."
find $DEST_DIR -name "*.sql" -exec mysql -u root $APP_NAME < {} \; 2>/dev/null || echo "No SQL to import or MySQL unavailable"

echo "Linking AI SDKs..."
cd $DEST_DIR
npm link openai @google/generative-ai @anthropic-ai/sdk

echo "Deployment complete for $APP_NAME"
