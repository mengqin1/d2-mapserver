@echo off
CALL npm run build
CALL obfuscate.bat
docker stop d2-mapserver
docker rm d2-mapserver
docker build . -t joffreybesos/d2-mapserver:latest 
docker run -d -v "e/dev/d2-mapserver/cache:/app/cache" -v "/e/Games/Diablo II - 1.13c:/app/game" -e DISABLE_JSON=0 -e LOG_HISTORY=0 -e ENABLE_WATERMARK=0 --name d2-mapserver -p 3002:3002 -e PORT=3002 -e TZ=Australia/Melbourne joffreybesos/d2-mapserver:latest
docker logs --follow d2-mapserver