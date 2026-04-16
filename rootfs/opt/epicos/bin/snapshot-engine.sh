#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEST="/tmp/epicos_snapshots/snapshot_$TIMESTAMP.tar.gz"
echo "Performing atomic system checkpoint..."
tar -czf $DEST /opt/epicos /etc/sysctl.d/99-epicos.conf
echo "Snapshot saved to $DEST"
