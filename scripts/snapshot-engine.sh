#!/bin/bash
SOURCE=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/epicos/snapshots/$TIMESTAMP"

mkdir -p /opt/epicos/snapshots
echo "Creating checkpoint for $SOURCE..."
cp -r $SOURCE $BACKUP_DIR
echo "Snapshot saved to $BACKUP_DIR"
