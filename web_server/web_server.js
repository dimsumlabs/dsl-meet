import { serveTLS } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";
import { Client } from "https://deno.land/x/irc@v0.4.1/mod.ts";

const ircChannel = "#my_channel";
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

console.log("Connecting to Freenode IRC...");
await ircClient.connect("irc.freenode.net", 6667);
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
    const path = `${Deno.cwd()}/public${req.url}`
    if (await fileExists(path)) {
        const content = await serveFile(req, path);
        req.respond(content);
    } else if (req.url === "/") {
        const content = await serveFile(req, "public/index.html");
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
