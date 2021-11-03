*dsl-meet* is a Jitsi Meet client setup which auto starts on a Linux
machine. There is a web server which serves a page with meet.jit.si in
an iframe. This allows use of the [Jitsi Meet IFrame API][2] to
monitor participant changes and notify our IRC channel.

See also our wiki entry about [Jitsi at Dim Sum Labs][3].


Setup
=====

 1. Make sure that Deno is installed.
 
 2. Clone this repo into: `~/dsl-meet`

 3. Generate the certificates (taken from the article [“How to create
    an HTTPS certificate for localhost domains”][1]):

        cd ~/dsl-meet/web_server
        openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Example-Root-CA"
        openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
        openssl req -new -nodes -newkey rsa:2048 -keyout localhost.key -out localhost.csr -subj "/C=US/ST=HongKong/L=HongKong/O=Example-Certificates/CN=localhost.local"
        openssl x509 -req -sha256 -days 1024 -in localhost.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out localhost.crt

    The local web site needs to be served via HTTPS. Otherwise
    Chromium does not allow access to the camera and the microphone to
    persist.

 4. Allow Deno to open port 443 and avoid the *permission denied* error:

        sudo setcap CAP_NET_BIND_SERVICE=+eip $(which deno)
        
 5. Set up auto start of the web server and of the UI:

        ln -s ~/dsl-meet/.bash_profile ~
        ln -s ~/dsl-meet/.xinitrc ~

 6. Import the previously generated root certificate into Chromium. By
    example of Chromium 87:

     1. Navigate to settings, then *Privacy and security*, *Manage
        certificates*, *Authorities* (tab).

     2. Import `~/dsl-meet/web_server/RootCA.crt`, and trust it for
        identifying websites.
        
 7. Put the Libera chat IRC password for user `dsl-meet` into:
 
        ~/dsl-meet.irc_password

[1]: https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8
[2]: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
[3]: https://github.com/dimsumlabs/dsl-meta/wiki/Jitsi
