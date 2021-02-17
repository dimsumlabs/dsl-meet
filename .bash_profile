[[ -f ~/.bashrc ]] && . ~/.bashrc

if [ -z "${DISPLAY}" ] && [ ! -z "${XDG_VTNR}" ]  && [ "${XDG_VTNR}" -eq 1 ];
then
        exec ./dsl-meet/start
fi

echo "To make X avilable by VNC, run:"
echo "x11vnc -auth guess -forever -loop -noxdamage -repeat -rfbport 5900 -shared"
