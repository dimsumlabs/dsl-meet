[[ -f ~/.bashrc ]] && . ~/.bashrc

if [ -z "${DISPLAY}" ] && [ ! -z "${XDG_VTNR}" ]  && [ "${XDG_VTNR}" -eq 1 ];
then
        exec ./dsl-meet/start
fi

echo "To make X avilable by VNC, run:"
echo "x11vnc -auth guess -forever -loop -noxdamage -repeat -rfbport 5900 -shared"

(
    REPO=dsl-meet
    cd ~/"$REPO"
    UNCOMMITTED_CHANGES=$(git status --porcelain 2>/dev/null | wc -l)
    if [ "$UNCOMMITTED_CHANGES" -gt 0 ]
    then
        echo
        echo "WARNING: The repo $REPO has uncommitted changes!"
    fi
)

. ~/.bashrc
