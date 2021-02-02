[[ -f ~/.bashrc ]] && . ~/.bashrc

if [ -z "${DISPLAY}" ] && [ ! -z "${XDG_VTNR}" ]  && [ "${XDG_VTNR}" -eq 1 ];
then
        exec ./dsl-meet/start
fi
