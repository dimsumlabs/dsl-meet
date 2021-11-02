import { serveTLS } from "https://deno.land/std@0.85.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.85.0/http/file_server.ts";
import { Client } from "https://deno.land/x/irc@v0.5.1/mod.ts";

const ircChannel = "#dimsumlabs";
const dirname = new URL(".", import.meta.url).pathname;
const options = {
  hostname: "localhost",
  port: 443,
  certFile: `${dirname}/localhost.crt`,
  keyFile: `${dirname}/localhost.key`
};
const server = serveTLS(options);

const ircClient = new Client({
  nick: "dsl-meet",
  channels: [ircChannel]
});

console.log("Connecting to Libera.Chat IRC...");
await ircClient.connect("irc.ipv6.libera.chat", 7000, true);
console.log("Connected");

// Taken from: https://www.youtube.com/watch?v=sFqihYDpoLc
async function fileExists(path) {
    try {
        const stats = await Deno.lstat(path);
        return stats && stats.isFile;
    } catch (e) {
        if (e && e instanceof Deno.errors.NotFound) {
            return false;
        } else {
            throw e;
        }
    }
}

console.log("Serving content...");
for await (const req of server) {
    const path = `${dirname}/public${req.url}`
    if (await fileExists(path)) {
        const content = await serveFile(req, path);
        req.respond(content);
    } else if (req.url === "/") {
        const content =
              await serveFile(req, `${dirname}/public/index.html`);
        req.respond(content);
    } else if (req.url === "/irc") {
        const buf = await Deno.readAll(req.body);
        const message = new TextDecoder("utf-8").decode(buf);
        ircClient.privmsg(ircChannel, message);
        req.respond({status: 201});
    } else {
        req.respond({status: 404});
    }
}
