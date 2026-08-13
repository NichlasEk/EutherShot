import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const host = process.env.EUTHERSHOT_HOST || "127.0.0.1";
const port = Number(process.env.EUTHERSHOT_PORT || 4177);
const root = new URL("../", import.meta.url).pathname;
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://${host}`).pathname);
  const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const file = normalize(join(root, relative));

  if (!file.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    if (!statSync(file).isFile()) throw new Error("not a file");
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("EutherShot hittade inte den filen.");
  }
}).listen(port, host, () => {
  console.log(`EutherShot kör på http://${host}:${port}`);
});
