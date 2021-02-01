# Turn automatic screen blanking off:
xset s off
xset -dpms
xset s noblank

ratpoison &
chromium --enable-consumer-kiosk --start-fullscreen --app=file:///home/hackjam/jitsi_client_setup/index.html
