#!/bin/bash

if [ $# -lt 2 ]; then
    echo "Usage: $0 <cache-path> <d2-lod-game-path>"
    exit 0
fi

docker stop d2-mapserver
docker rm d2-mapserver
docker run -d -v "$1:/app/cache" -v "$2:/app/game" -e DISABLE_JSON=0 -e LOG_HISTORY=0 -e ENABLE_WATERMARK=0 --name d2-mapserver -p 3002:3002 -e PORT=3002 joffreybesos/d2-mapserver:latest
docker logs --follow d2-mapserver
