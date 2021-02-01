# Turn automatic screen blanking off:
xset s off
xset -dpms
xset s noblank

ratpoison &
chromium --enable-consumer-kiosk --start-fullscreen --app=https://localhost
