*dsl-meet* is a Jitsi Meet client setup which auto starts on a Linux
machine. There is a web server which serves a page with meet.jit.si in
an iframe. This allows use of the [Jitsi Meet IFrame API][2] to
monitor participant changes and notify our IRC channel.


Setup
=====

Generate the certificates (taken from the article [How to create an
HTTPS certificate for localhost domains][1]):

    openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Example-Root-CA"
    openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
    openssl req -new -nodes -newkey rsa:2048 -keyout localhost.key -out localhost.csr -subj "/C=US/ST=HongKong/L=HongKong/O=Example-Certificates/CN=localhost.local"
    openssl x509 -req -sha256 -days 1024 -in localhost.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out localhost.crt

Allow Deno to open port 443 and avoid the *permission denied* error:

    sudo setcap CAP_NET_BIND_SERVICE=+eip $(which deno)

Set up auto start of the web server and of the UI:

    ln -s start ~
    ln -s .xinitrc ~

[1]: https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8
[2]: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
