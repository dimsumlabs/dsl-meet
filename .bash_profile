# Deno:
export DENO_INSTALL="/home/hackjam/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
source <(deno completions bash)

if [ -z "${DISPLAY}" ] && [ ! -z "${XDG_VTNR}" ]  && [ "${XDG_VTNR}" -eq 1 ]; then
        exec ./start
fi
