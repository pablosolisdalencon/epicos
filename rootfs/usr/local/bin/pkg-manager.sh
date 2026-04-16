#!/bin/bash
ACTION=$1
REPO=$2
if [[ "$ACTION" == "deploy" ]]; then
    echo "Cloning $REPO..."
    git clone $REPO /tmp/deploy_target
    cd /tmp/deploy_target
    [[ -f "package.json" ]] && echo "Node.js stack detected" && npm link /opt/epicos/local_npm_cache/node_modules/openai
    [[ -f "composer.json" ]] && echo "PHP stack detected" && epic-php-switch 8.3
    echo "Deployment complete."
fi
